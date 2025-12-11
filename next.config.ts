/** @type {import('next').NextConfig} */
const nextConfig = {
  // Отключаем Strict Mode для совместимости с React Three Fiber и React 19
  reactStrictMode: false,
  
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
  
  // Транспилируем Three.js пакеты для корректной работы с Next.js 15
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
