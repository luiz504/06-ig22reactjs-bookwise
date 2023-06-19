/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  images: {
    domains: [
      'github.com',
      'images.unsplash.com',
      'http://localhost:3000',
      'public',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
    ],
  },
}

module.exports = nextConfig
