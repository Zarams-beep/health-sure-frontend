/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000', // Your backend port
        pathname: '/uploads/**',
      },
      // Add this for production:
      {
        protocol: 'https',
        hostname: 'your-production-domain.com',
        pathname: '/uploads/**',
      },
    ],
    // Optional: For external image services
    domains: ['upload.wikimedia.org'],
  },
};

module.exports = nextConfig;