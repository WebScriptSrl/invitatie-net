/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      // For production environment
      {
        protocol: "https",
        hostname: "**.invitatie.net",
        port: "",
      },
    ],
  },
};

export default nextConfig;
