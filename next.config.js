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
    domains: ["taksikirklareli.com"],
  },
};

module.exports = nextConfig;
