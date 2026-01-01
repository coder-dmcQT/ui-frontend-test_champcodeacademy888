import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output:'export',
    distDir:'./dist/',
    experimental: {

    },
    reactStrictMode: true,
    images: {
        unoptimized: true
    },
};

export default nextConfig;
