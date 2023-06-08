/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['.api.ts', '.api.tsx', 'page.tsx'],
  images: {
    domains: ['github.com'],
  },
}

module.exports = nextConfig
