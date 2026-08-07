import { Resend } from "resend";

const TO_EMAIL = "hello@gmmoulin.com";
// Verified against a subdomain, not the gmmoulin.com apex, so Resend's
// SPF/DKIM records never collide with the Cloudflare Email Routing MX
// records already on the apex for receiving hello@gmmoulin.com.
const FROM_EMAIL = "Portfolio Contact <contact@send.gmmoulin.com>";

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
		return Response.json({ error: "Failed to send" }, { status: 502 });
	}

	return Response.json({ ok: true });
}
