import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/uploads/:path*", // Tetap sama, tapi kita atur folder manual
      },
    ];
  },
  /* config options here */

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_API_URL as string,
        port: "3000",
        pathname: "/api/serve-file",
      },
    ],
  },
};

export default nextConfig;
