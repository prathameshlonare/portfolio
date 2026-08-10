import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["192.168.31.59", "192.168.*.*"],
};

export default nextConfig;
