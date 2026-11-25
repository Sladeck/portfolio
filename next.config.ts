import type { NextConfig } from "next";

// Sent on every response, pages and API routes alike. The
// Content-Security-Policy is not here: it carries a per-request nonce, so
// it is set in src/proxy.ts instead.
const SECURITY_HEADERS = [
	// No includeSubDomains or preload: those would also bind every other
	// gmmoulin.com subdomain to HTTPS for two years, and are hard to undo.
	{ key: "Strict-Transport-Security", value: "max-age=63072000" },
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	// Legacy twin of the CSP's frame-ancestors, for older browsers.
	{ key: "X-Frame-Options", value: "DENY" },
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
	},
];

const nextConfig: NextConfig = {
	// Standalone output: self-contained server + traced deps, no full
	// node_modules needed in the production Docker image.
	output: "standalone",
	poweredByHeader: false,
	// Nothing uses next/image: every image is a plain <img> of a file that
	// is already sized and in WebP. Turning optimisation off makes
	// /_next/image answer 404, which removes the image optimiser (and
	// sharp behind it) from what the public internet can reach.
	images: { unoptimized: true },
	async headers() {
		return [{ source: "/:path*", headers: SECURITY_HEADERS }];
	},
};

export default nextConfig;
