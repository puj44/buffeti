/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
