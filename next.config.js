/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/recipe-sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  }
}

module.exports = nextConfig
