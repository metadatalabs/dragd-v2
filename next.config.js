/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  exportPathMap: async function (defaultPathMap) {
    delete defaultPathMap['/[...siteRoute]'];
    return defaultPathMap;
  },
}

module.exports = nextConfig
