/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["github.com", "source.unsplash.com"],
  },
};

module.exports = nextConfig;
