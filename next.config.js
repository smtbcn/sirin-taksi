/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "taksikirklareli.com",
      },
    ],
  },
};

module.exports = nextConfig;
