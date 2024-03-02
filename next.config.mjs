/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
