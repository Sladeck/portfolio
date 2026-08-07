"use client";

import "./panel.css";
import type { ReactNode } from "react";

interface PanelProps {
	title: string;
	badge?: string;
	/** Rendered as label/value tiles. Ignored if `children` is passed instead. */
	items?: { label: string; value: string }[];
	/** Custom body content (e.g. a tag list) instead of the tile grid. */
	children?: ReactNode;
}

// Bordered box with a header (title + optional badge) and a body: the
// toolset/status/tag-panel readouts used across the site.
export default function Panel({ title, badge, items, children }: PanelProps) {
	return (
		<div className="panel">
			<div className="panel-header">
				<h2>{title}</h2>
				{badge && <span className="panel-badge">{badge}</span>}
			</div>

			<div className="panel-body">
				{items
					? items.map(({ label, value }) => (
							<div className="panel-group" key={label}>
								<span className="panel-label">{label}</span>
								<span className="panel-value">{value}</span>
							</div>
						))
					: children}
			</div>
		</div>
	);
}
