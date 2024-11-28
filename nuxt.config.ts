export default defineNuxtConfig({
  nitro: {
    preset: "cloudflare-pages",

    prerender: {
      autoSubfolderIndex: false,
    },
    experimental: {
      wasm: true,
    },
  },
  modules: ["@nuxt/devtools", "@nuxthub/core"],
  plugins: ["~/plugins/vue-query.ts"],
  compatibilityDate: "2024-11-28",
});