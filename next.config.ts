import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    turbopack: {
    resolveAlias: {
      css: "",
    },
  },
  headers: async () => {
    return [
      {
        source: "/_next/static/chunks/:path*.css",
        headers: [
          {
            key: "Content-Type",
            value: "text/css; charset=utf-8",
          },
        ],
      },
    ];
  },
};

export default nextConfig;