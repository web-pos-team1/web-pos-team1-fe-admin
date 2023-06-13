/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.ajunews.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;