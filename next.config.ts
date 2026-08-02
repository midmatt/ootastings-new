import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    // Placeholder photography only — swap for client-supplied assets before launch.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Client photography, served from the project's Vercel Blob store.
      {
        protocol: "https",
        hostname: "5mimhywtvsblan4k.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
