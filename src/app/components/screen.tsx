"use client";

import "./screen.css";
import type { ReactNode } from "react";

const CORNERS = ["tl", "tr", "bl", "br"] as const;

interface ScreenProps {
	children: ReactNode;
}

// The CRT-framed "TV" every section renders inside. Owns the decorative
// gold frame (inset border, corner brackets, diamond accents) and the
// background texture (scanlines, flicker, vignette, a slow scan roll).
export default function Screen({ children }: ScreenProps) {
	return (
		<div className="screen">
			<div className="screen-vignette" aria-hidden="true" />
			<div className="screen-flicker" aria-hidden="true" />
			<div className="screen-scanlines" aria-hidden="true">
				<div className="screen-scanlines-gold" />
				<div className="screen-scanlines-green" />
				<div className="screen-rollbar" />
			</div>

			<div className="screen-inset-border" aria-hidden="true" />

			{CORNERS.map((corner) => (
				<span
					key={corner}
					className={`screen-corner screen-corner--${corner}`}
					aria-hidden="true"
				/>
			))}

			{CORNERS.map((corner) => (
				<span
					key={corner}
					className={`screen-diamond screen-diamond--${corner}`}
					aria-hidden="true"
				>
					◆
				</span>
			))}

			{children}
		</div>
	);
}
