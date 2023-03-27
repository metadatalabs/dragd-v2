/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  // trailingSlash: true,
  assetPrefix: process.env.APP_ENV === 'STATIC' ? './' : '',
  env: {
    NEXT_PUBLIC_MINTER_ADDRESS: "0x88289ac519eFb1cba5F522970E63264a969BeD06",
  },
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    // if(!dev) delete defaultPathMap['/[...siteRoute]'];
    // return defaultPathMap;
    var pathMap = {
      '/': { page: '/' },
    };

    pathMap['/prnth.eth'] = { page: '/[...siteRoute]', query: { id: 'about' } };
    return pathMap;
  },
}

module.exports = nextConfig
