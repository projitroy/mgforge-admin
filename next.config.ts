import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites(){
    return [
      {
        source: '/admin/auth/login',
        destination: 'http://localhost:8080/admin/auth/login',
      },
    ]
  }
};

export default nextConfig;
