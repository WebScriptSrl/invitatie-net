/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "*.invitatie.net",
        path: "/get-image/",
      },
    ],
  },
};

export default nextConfig;
