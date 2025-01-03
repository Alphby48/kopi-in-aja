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
        protocol: "https",
        hostname: "kopiinaja-zeta.vercel.app",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
