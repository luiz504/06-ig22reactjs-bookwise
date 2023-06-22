const path = require('path')

/**
 * @type {import('next-react-svg').NextReactSvgConfig}
 */
const nextReactSvgConfig = {
  include: path.resolve(__dirname, 'src/assets'),
}

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

const withReactSvg = require('next-react-svg')(nextReactSvgConfig)

module.exports = withReactSvg(nextConfig)
