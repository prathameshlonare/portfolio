import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isProd ? { output: "export" } : {}),
  trailingSlash: true,
  allowedDevOrigins: ["192.168.31.59", "192.168.*.*"],
  ...(!isProd
    ? {
        async rewrites() {
          return [
            {
              source: "/dorm-dish",
              destination: "/dorm-dish/index.html",
            },
            {
              source: "/dorm-dish/:path((?!static/|_next/|.*\\..*).*)",
              destination: "/dorm-dish/index.html",
            },
            {
              source: "/voting",
              destination: "/voting/index.html",
            },
            {
              source: "/voting/:path((?!static/|_next/|.*\\..*).*)",
              destination: "/voting/index.html",
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
