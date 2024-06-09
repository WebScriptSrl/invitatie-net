/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.invitatie.net",
        port: "",
        path: "/api/images/**",
      },
    ],
  },
};

export default nextConfig;
