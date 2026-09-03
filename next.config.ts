import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // The calculator demo is plain static files under public/demo, so it
      // stays byte-identical to what clients are given. These rewrites give
      // it clean URLs instead of exposing the .html extensions.
      { source: "/demo", destination: "/demo/index.html" },
      { source: "/demo/measure", destination: "/demo/measure.html" },
      { source: "/demo/embed", destination: "/demo/embed.html" },

      // Client preview: The Exterior Cleaners North West.
      { source: "/extcleannorthw", destination: "/extcleannorthw/index.html" },
      { source: "/extcleannorthw/measure", destination: "/extcleannorthw/measure.html" },
      { source: "/extcleannorthw/embed", destination: "/extcleannorthw/embed.html" },
    ];
  },
};

export default nextConfig;
