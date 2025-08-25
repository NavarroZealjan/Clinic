/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // ✅ disable lightningcss, use PostCSS instead
  },
};

module.exports = nextConfig;
