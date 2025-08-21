/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: [],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.experiments = config.experiments || {};
      config.experiments.topLevelAwait = true;
    }

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
