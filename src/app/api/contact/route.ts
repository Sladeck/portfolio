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
}

export async function POST(request: Request) {
	const { from, replyTo, body }: ContactPayload = await request.json();

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
