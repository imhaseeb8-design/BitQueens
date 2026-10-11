import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Codex preview opens the local app through this host in development.
  allowedDevOrigins: ['127.0.0.1'],
  // /conference was the page's address for its whole life; anything already
  // linking to it — including the footer of a sent email — should still land.
  async redirects() {
    return [
      { source: '/conference', destination: '/events', permanent: true },
      { source: '/conference/:path*', destination: '/events/:path*', permanent: true },
    ];
  },
};

export default nextConfig;
