/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    BASE_URL: process.env.BASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
};

module.exports = nextConfig;
