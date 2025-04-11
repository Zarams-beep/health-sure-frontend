/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000', // For local development
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'health-sure-backend.onrender.com', // For production
        pathname: '/uploads/**',
      },
    ],
    // Optional: For external image services like Wikipedia
    domains: ['upload.wikimedia.org'],
  },
};

module.exports = nextConfig;
