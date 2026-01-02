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
    basePath: "",
    assetPrefix: './'
};

export default nextConfig;
