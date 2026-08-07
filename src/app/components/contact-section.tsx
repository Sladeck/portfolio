"use client";

import "./contact-section.css";
import { useState, type SubmitEvent } from "react";

const CONTACT_EMAIL = "hello@gmmoulin.com";

type Status = "idle" | "sending" | "sent" | "error";

const STATUS_MESSAGES: Record<Status, string> = {
	idle: "",
	sending: "sending...",
	sent: "sent, I'll get back to you soon",
	error: "failed to send, email me directly instead",
};

// Contact page: form (POSTs to /api/contact, which sends via Resend) plus
// direct email/GitHub/LinkedIn links.
export default function ContactSection() {
	const [status, setStatus] = useState<Status>("idle");

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(form);

		setStatus("sending");

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					from: data.get("from"),
					replyTo: data.get("replyTo"),
					body: data.get("body"),
				}),
			});

			if (!res.ok) throw new Error("send failed");

			setStatus("sent");
			form.reset();
		} catch {
			setStatus("error");
		}
	}

	return (
		<section className="contact-section">
			<h1 className="contact-heading">&gt; initiate_contact</h1>

			<p className="contact-intro">
				Freelance and currently available for new projects. Tell me
				what&apos;s broken or what needs building, I&apos;ll get back to you as soon as possible.
			</p>

			<div className="contact-grid">
				<form className="contact-form" onSubmit={handleSubmit}>
					<label className="contact-field">
						<span>--from</span>
						<div className="contact-input-row">
							<span className="contact-prompt">$</span>
							<input
								type="text"
								name="from"
								placeholder="name & company"
								required
							/>
						</div>
					</label>

					<label className="contact-field">
						<span>--reply-to</span>
						<div className="contact-input-row">
							<span className="contact-prompt">$</span>
							<input
								type="email"
								name="replyTo"
								placeholder="your@email.com"
								required
							/>
						</div>
					</label>

					<label className="contact-field">
						<span>--body</span>
						<div className="contact-input-row contact-input-row--area">
							<span className="contact-prompt">$</span>
							<textarea
								name="body"
								rows={9}
								placeholder="scope, timeline, budget range"
								required
							/>
						</div>
					</label>

					<div className="contact-submit-row">
						<button
							type="submit"
							className="contact-submit"
							disabled={status === "sending"}
						>
							&gt; send --now
						</button>
						<span className="contact-status" role="status" aria-live="polite">
							{STATUS_MESSAGES[status]}
						</span>
					</div>
				</form>

				<div className="contact-side">
					<div className="contact-card">
						<span className="contact-card-label">DIRECT</span>
						<a href={`mailto:${CONTACT_EMAIL}`} className="contact-card-link">
							{CONTACT_EMAIL}
						</a>
					</div>

					<div className="contact-card">
						<span className="contact-card-label">CHANNELS</span>
						<a
							href="https://github.com/Sladeck?tab=repositories"
							target="_blank"
							rel="noopener noreferrer"
							className="contact-card-link"
						>
							github.com/Sladeck
						</a>
						<a
							href="https://linkedin.com/in/gmmoulin"
							target="_blank"
							rel="noopener noreferrer"
							className="contact-card-link"
						>
							linkedin.com/in/gmmoulin
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
