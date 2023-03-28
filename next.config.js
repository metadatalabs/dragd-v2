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
  }
}

module.exports = nextConfig
