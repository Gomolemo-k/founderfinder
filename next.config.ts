import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: false,
    clientSegmentCache: false,
    nodeMiddleware: false
  }
};

export default nextConfig;
