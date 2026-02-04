import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore
  allowedDevOrigins: [
    "localhost:3000",
    "127.0.0.1:3000",
    "10.146.243.72:3000",
    "10.146.243.72" // Just in case
  ],
};

export default nextConfig;
