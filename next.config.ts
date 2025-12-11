/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
  },
  staticPageGenerationTimeout: 1,
};

export default nextConfig;
