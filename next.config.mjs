/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.BUCKET}.s3.ap-southeast-1.amazonaws.com`,
        port: "",
        pathname: "/**",
      },
    ],
  },
  
};

export default nextConfig;
