import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Standalone output: self-contained server + traced deps, no full
	// node_modules needed in the production Docker image.
	output: "standalone",
};

export default nextConfig;
