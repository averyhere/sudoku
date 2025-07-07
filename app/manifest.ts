import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sudoku",
    short_name: "Sudoku",
    description: "A Sudoku game built with Next.js by Avery Ondo",
    start_url: "/",
    display: "standalone",
    background_color: "#171717",
    // theme_color: "#a41ef1",
    icons: [
      {
        src: "/favicons/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicons/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
