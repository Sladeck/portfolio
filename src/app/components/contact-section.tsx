"use client";

import "./contact-section.css";
import { useState, type FormEvent } from "react";

// Placeholder until Guillaume has a domain + alias set up. See the
// contact-form-backend memory: this form intentionally doesn't send
// anywhere yet, it just reports that honestly instead of faking success.
const CONTACT_EMAIL = "john.doe@domain.com";

export default function ContactSection() {
	const [status, setStatus] = useState("");

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus("not wired yet, email me directly for now");
	}

	return (
		<section className="contact-section">
			<h2 className="contact-heading">&gt; initiate_contact</h2>

			<p className="contact-intro">
				Freelance and currently available for new projects. Tell me
				what's broken or what needs building, I'll get back to you as soon as possible.
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
								placeholder="name @ company"
								autoFocus
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
								placeholder="you@domain.com"
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
								rows={3}
								placeholder="scope, timeline, budget range"
								required
							/>
						</div>
					</label>

					<div className="contact-submit-row">
						<button type="submit" className="contact-submit">
							&gt; send --now
						</button>
						<span className="contact-status">{status}</span>
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
