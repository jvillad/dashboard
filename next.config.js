/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  headers: [
    {
      key: 'Cache-Control',
      value: 'no-store, max-age=0',
    },
  ],
};

module.exports = nextConfig;
