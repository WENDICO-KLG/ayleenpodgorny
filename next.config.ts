import type { NextConfig } from "next";

// Statischer Export: `npm run build` schreibt die fertige Site nach ./out
// und kann wie bisher auf jedem statischen Host liegen.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
