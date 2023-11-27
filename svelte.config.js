import adapter from "sveltekit-adapter-chrome-extension";
export default {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: null,
      precompress: false,
      manifest: "manifest.json",
    }),
    appDir: "app",
  },
};
