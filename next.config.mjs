/** @type {import('next').NextConfig} */

const nextConfig = {
  //   distDir: "out",
  distDir: "dist",
  eslint: {
    // Disable the ESLint check during production build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
