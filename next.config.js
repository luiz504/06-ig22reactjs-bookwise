/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['.api.ts', '.api.tsx', 'page.tsx'],
  images: {
    domains: ['github.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig
