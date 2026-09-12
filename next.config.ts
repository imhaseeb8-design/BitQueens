import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Codex preview opens the local app through this host in development.
  allowedDevOrigins: ['127.0.0.1'],
};

export default nextConfig;
