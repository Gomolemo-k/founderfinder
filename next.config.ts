import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: false,                
    clientSegmentCache: false, 
    nodeMiddleware: true      
  },
  output: 'standalone',
};

export default nextConfig;
