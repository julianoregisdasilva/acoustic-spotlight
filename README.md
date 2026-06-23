**To deploy correctly, some adjustments were made in some files:**

# vite.config.ts:
```
build: {  
          // Relative path string (relative to project root)  
          outDir: "dist",  
          // Optional: Forces Vite to empty the folder before building  
          emptyOutDir: true,  
  },
 ```
  // Tells Vite the base public path when served in development or production, ensuring assets are correctly loaded on GitHub Pages.
  base: "/",

# package.json
  Tell GitHub Pages the final URL where the Project will be hosted, helping to generate correct production links
  "homepage": "https://www.renatoalvesacustico.com.br"
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"

# CNAME
In the project root, I created a file called CNAME containing the URL to tell GitHub pages which custom domain to use, ensuring the site is accessible via my personalized web address and preventing redirection issues upon future updates.

I created .github/workflows/deploy.yml to tell GitHub Actions how to deploy my project. For that to work, it's necessary to go to the Settings tab, Secrets and Variables sections, Actions subsection and create a new Repository Secret.
