"use client";

import "./screen.css";
import type { ReactNode } from "react";

const CORNERS = ["tl", "tr", "bl", "br"] as const;

interface ScreenProps {
	children: ReactNode;
}

// The CRT-framed "TV" every section renders inside. Owns the decorative
// gold frame (inset border, corner brackets, diamond accents) for now.
// Background texture and animated overlays are a separate pass.
export default function Screen({ children }: ScreenProps) {
	return (
		<div className="screen">
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
