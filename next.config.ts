import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    domains:['res.cloudinary.com']
  },
  async rewrites() {
    return [
      {
        source: "/dashboard/:path*",
        destination: "/dashboard",
      },
    ];
  },
};

export default nextConfig;
