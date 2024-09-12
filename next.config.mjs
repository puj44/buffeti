/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    minimumCacheTTL: 31536000,

    remotePatterns:[
      {
        protocol:"https",
        hostname: "dev-api.buffeti.com"
      },
      {
        protocol:"https",
        hostname: "api.buffeti.com"
      },
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
