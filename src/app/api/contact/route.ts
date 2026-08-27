import { Resend } from "resend";

const TO_EMAIL = "hello@gmmoulin.com";
// The domain verified in Resend is gmmoulin.com itself (that's what was
// typed into "Add Domain"): Resend scopes the actual MX/SPF DNS records
// under a send.gmmoulin.com prefix internally to avoid colliding with the
// Cloudflare Email Routing MX records on the apex, but the sender identity
// it validates `from` against is still the gmmoulin.com domain object.
const FROM_EMAIL = "Portfolio Contact <contact@gmmoulin.com>";

interface ContactPayload {
	from?: string;
	replyTo?: string;
	body?: string;
	/** Honeypot: hidden from real visitors, so anything here is a bot. */
	website?: string;
	/** How long the form was on screen before it was submitted. */
	elapsedMs?: number;
}

// Nobody fills in three fields in under three seconds. Generous on
// purpose: this only has to catch scripts posting straight at the
// endpoint, and a false positive costs a real person their message.
const MIN_FILL_MS = 3000;

// Per-IP sliding window. The Cloudflare rule in front of this can only
// express a 10-second window on the free plan, which caps a single
// address at ~1,000 requests an hour: enough to drain a day of Resend
// quota in minutes and leave real enquiries failing silently. The long
// window is the part the edge can't do, so it lives here.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Ceiling on how many addresses we track at once, so an attacker
// rotating source IPs can't turn the limiter itself into a slow leak.
const MAX_TRACKED_IPS = 5000;

// Module scope, so it is shared across requests: one container, one
// process, so a Map is genuinely enough. It resets on redeploy, which is
// an acceptable trade for having no dependency and no network hop.
const attempts = new Map<string, number[]>();

function clientIp(request: Request): string {
	// Cloudflare proxies this domain, so cf-connecting-ip is set by the
	// one hop we control. X-Forwarded-For is only a fallback and is read
	// from the END: proxies append to it, so the first entry is whatever
	// the client claimed and the last is what our nearest proxy saw.
	const cloudflare = request.headers.get("cf-connecting-ip");
	if (cloudflare) return cloudflare.trim();

	const forwarded = request.headers.get("x-forwarded-for");
	if (forwarded) {
		const hops = forwarded.split(",");
		return hops[hops.length - 1].trim();
	}

	return "unknown";
}

// Drops timestamps that have aged out, then entries left empty by that.
// If an active flood still leaves us over the ceiling, evict oldest
// first: Map iterates in insertion order.
function sweep(cutoff: number): void {
	for (const [ip, times] of attempts) {
		const recent = times.filter((time) => time > cutoff);
		if (recent.length === 0) attempts.delete(ip);
		else attempts.set(ip, recent);
	}

	let excess = attempts.size - MAX_TRACKED_IPS;
	if (excess <= 0) return;
	for (const ip of attempts.keys()) {
		if (excess-- <= 0) break;
		attempts.delete(ip);
	}
}

/** Records an attempt. Returns seconds to wait if it should be refused. */
function rateLimit(ip: string): number | null {
	const now = Date.now();
	const cutoff = now - WINDOW_MS;
	const recent = (attempts.get(ip) ?? []).filter((time) => time > cutoff);

	if (recent.length >= MAX_PER_WINDOW) {
		attempts.set(ip, recent);
		// Room frees up when the oldest attempt in the window ages out.
		return Math.max(1, Math.ceil((recent[0] + WINDOW_MS - now) / 1000));
	}

	recent.push(now);
	attempts.set(ip, recent);
	if (attempts.size > MAX_TRACKED_IPS) sweep(cutoff);
	return null;
}

export async function POST(request: Request) {
	// Checked before anything else, including the honeypot: this guards
	// the endpoint, not just the mail send.
	const retryAfter = rateLimit(clientIp(request));
	if (retryAfter !== null) {
		return Response.json(
			{ error: "Too many attempts" },
			{ status: 429, headers: { "Retry-After": String(retryAfter) } },
		);
	}

	// Anything can POST here, so nothing about the body is assumed. An
	// unparseable one (or a bare `null`, which destructures into a
	// TypeError) is a 400, not an unhandled 500 filling the logs with
	// stack traces that hide real failures.
	let payload: ContactPayload;
	try {
		const parsed: unknown = await request.json();
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
			throw new Error("expected a JSON object");
		}
		payload = parsed as ContactPayload;
	} catch {
		return Response.json({ error: "Invalid body" }, { status: 400 });
	}

	const { from, replyTo, body, website, elapsedMs } = payload;

	// Answer 200 without sending. A bot that gets an error learns to try
	// something else; one that gets a success moves on believing it
	// worked, which is the entire point of a honeypot.
	const trapped = Boolean(website?.trim());
	const tooFast = typeof elapsedMs === "number" && elapsedMs < MIN_FILL_MS;
	if (trapped || tooFast) {
		console.warn(
			`Contact form rejected: ${trapped ? "honeypot" : "submitted in " + elapsedMs + "ms"}`,
		);
		return Response.json({ ok: true });
	}

	if (!from || !replyTo || !body) {
		return Response.json({ error: "Missing fields" }, { status: 400 });
	}

	// Constructed per-request, not at module scope: at module scope this
	// throws during `next build`'s page-data collection, since the
	// production image is built without RESEND_API_KEY (it's bind-mounted
	// at container runtime, see docker-compose.prod.yml).
	const resend = new Resend(process.env.RESEND_API_KEY);
	const { error } = await resend.emails.send({
		from: FROM_EMAIL,
		to: TO_EMAIL,
		replyTo,
		subject: `New message from ${from}`,
		text: `From: ${from}\nReply-to: ${replyTo}\n\n${body}`,
	});

	if (error) {
		console.error("Resend send failed:", error);
		return Response.json({ error: "Failed to send" }, { status: 502 });
	}

	return Response.json({ ok: true });
}
