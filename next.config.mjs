/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Force SWC to be used for things like next/font
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
