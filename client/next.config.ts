import type { NextConfig } from "next";

// Spring Boot backend URL — hardcoded for production reliability
const BACKEND_URL = process.env.BACKEND_URL || "https://codevisualizor-api-v2.onrender.com";

const nextConfig: NextConfig = {
  // @ts-ignore
  allowedDevOrigins: ["localhost:3000", "127.0.0.1:3000"],

  // Increase proxy timeout so backend cold starts (up to 90s) don't cause 504
  experimental: {
    // @ts-ignore
    proxyTimeout: 120000, // 2 minutes
  },

  // Prevent CDN from caching HTML pages — only cache static assets
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
      {
        // Allow long caching for static assets (JS, CSS, images)
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      { source: "/api/:path*",    destination: `${BACKEND_URL}/api/:path*` },
      { source: "/oauth2/:path*", destination: `${BACKEND_URL}/oauth2/:path*` },
      { source: "/login/:path*",  destination: `${BACKEND_URL}/login/:path*` },
    ];
  },
};

export default nextConfig;
