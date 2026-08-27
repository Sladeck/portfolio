"use client";

import "./contact-section.css";
import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { useTranslations } from "../hooks/useTranslations";

const CONTACT_EMAIL = "hello@gmmoulin.com";

// Honeypot. Named after a field bots want to fill, positioned off-screen
// rather than display:none (which the better scrapers skip), and hidden
// from assistive tech and the tab order so no real visitor can reach it.
const HONEYPOT_FIELD = "website";

type Status = "idle" | "sending" | "sent" | "error";

// Contact page: form (POSTs to /api/contact, which sends via Resend) plus
// direct email/GitHub/LinkedIn links.
export default function ContactSection() {
	const dict = useTranslations();
	const [status, setStatus] = useState<Status>("idle");

	// Set on mount, not during render, so it's always the visitor's own
	// clock and never a server timestamp carried through hydration.
	const mountedAt = useRef(0);
	useEffect(() => {
		mountedAt.current = Date.now();
	}, []);

	const statusMessages: Record<Status, string> = {
		idle: "",
		sending: dict.contact.statusSending,
		sent: dict.contact.statusSent,
		error: dict.contact.statusError,
	};

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
					[HONEYPOT_FIELD]: data.get(HONEYPOT_FIELD),
					// How long the form was on screen. Omitted rather than
					// sent as 0 if the mount effect somehow hasn't run, so a
					// missing value can never read as "submitted instantly".
					elapsedMs: mountedAt.current
						? Date.now() - mountedAt.current
						: undefined,
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
			<h1 className="contact-heading">{dict.contact.heading}</h1>

			<p className="contact-intro">{dict.contact.intro}</p>

			<div className="contact-grid">
				<form className="contact-form" onSubmit={handleSubmit}>
					{/* Not display:none on purpose, see HONEYPOT_FIELD. */}
					<div className="contact-honeypot" aria-hidden="true">
						<input
							type="text"
							name={HONEYPOT_FIELD}
							tabIndex={-1}
							autoComplete="off"
						/>
					</div>

					<label className="contact-field">
						<span>{dict.contact.fromLabel}</span>
						<div className="contact-input-row">
							<span className="contact-prompt">$</span>
							<input
								type="text"
								name="from"
								placeholder={dict.contact.fromPlaceholder}
								required
							/>
						</div>
					</label>

					<label className="contact-field">
						<span>{dict.contact.replyToLabel}</span>
						<div className="contact-input-row">
							<span className="contact-prompt">$</span>
							<input
								type="email"
								name="replyTo"
								placeholder={dict.contact.replyToPlaceholder}
								required
							/>
						</div>
					</label>

					<label className="contact-field">
						<span>{dict.contact.bodyLabel}</span>
						<div className="contact-input-row contact-input-row--area">
							<span className="contact-prompt">$</span>
							<textarea
								name="body"
								rows={9}
								placeholder={dict.contact.bodyPlaceholder}
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
							{dict.contact.submit}
						</button>
						<span
							className={`contact-status contact-status--${status}`}
							role="status"
							aria-live="polite"
						>
							{statusMessages[status]}
						</span>
					</div>
				</form>

				<div className="contact-side">
					<div className="contact-card">
						<span className="contact-card-label">{dict.contact.directLabel}</span>
						<a href={`mailto:${CONTACT_EMAIL}`} className="contact-card-link">
							{CONTACT_EMAIL}
						</a>
					</div>

					<div className="contact-card">
						<span className="contact-card-label">{dict.contact.channelsLabel}</span>
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
