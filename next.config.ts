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
    env: {
        enableMSW: process.env.NEXT_PUBLIC_ENABLE_MSW
    }
};

export default nextConfig;
