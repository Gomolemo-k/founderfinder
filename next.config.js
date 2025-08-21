/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ensures everything is included in output
  experimental: {
    serverComponentsExternalPackages: [], // optional, include packages explicitly
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.experiments = config.experiments || {};
      config.experiments.topLevelAwait = true; // if needed for async modules
    }

    // treat chunks as external for Cloudflare
    config.externals = [
      ...(config.externals || []),
      function ({ request }, callback) {
        if (request && request.startsWith('./chunks/')) {
          return callback(null, 'commonjs ' + request);
        }
        callback();
      },
    ];

    return config;
  },
};

module.exports = nextConfig;
