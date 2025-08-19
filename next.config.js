// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: false,
    clientSegmentCache: false,
    nodeMiddleware: false
  }
};

module.exports = nextConfig;
