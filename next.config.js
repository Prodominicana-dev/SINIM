/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "127.0.0.1",
      "localhost",
      "sinim-api-git-tools-prodominicanadev.vercel.app",
      "images.unsplash.com",
      "sinim.prodominicana.gob.do"
    ],
  },
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },
};

module.exports = nextConfig;
