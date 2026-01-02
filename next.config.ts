import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output:'export',
    distDir:'./docs',
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
