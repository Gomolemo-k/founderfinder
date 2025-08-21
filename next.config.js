/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        // opentelemetry's platform is Node-only, stub it
        "../platform": false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
