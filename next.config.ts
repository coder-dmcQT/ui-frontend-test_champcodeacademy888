import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output:'export',
    basePath: "/ui-frontend-test_champcodeacademy888",
    reactStrictMode: true,
    images: {
        unoptimized: true
    },
    assetPrefix: '/ui-frontend-test_champcodeacademy888/',
};

export default nextConfig;
