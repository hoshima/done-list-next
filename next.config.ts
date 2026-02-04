import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true, // Cache Components enabled (moved to root in 16.0.3+)
  reactCompiler: true,
};

export default nextConfig;
