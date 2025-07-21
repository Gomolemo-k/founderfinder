/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // These belong at the top level, not inside 'experimental'
  runtime: 'nodejs',
  optimizeCss: false,
  optimizeFonts: false,
}

module.exports = nextConfig;
