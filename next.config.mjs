/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    minimumCacheTTL: 31536000,

    remotePatterns:[
      {
        protocol:"https",
        hostname: process.env.NEXT_PUBLIC_IMAGES_URL
      }
    ]
  },
  async redirects() {
    return[
      {
        source: "/_error",
        destination: "/",
        permanent: true
      }
    ]
  }
};

export default nextConfig;
