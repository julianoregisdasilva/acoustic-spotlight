To deploy correctly, some adjustments were made in some files:

vite.config.ts:
 build: {
    // Relative path string (relative to project root)
    outDir: "dist",
    // Optional: Forces Vite to empty the folder before building
    emptyOutDir: true,
  },

  // Tells Vite the base public path when served in development or production, ensuring assets are correctly loaded on GitHub Pages.
  base: "/",

  package.json

  
