import { defineNuxtConfig } from 'nuxt3'
import { resolve } from 'path'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  nitro: {
    preset: resolve(__dirname, 'presets/deno-deploy')
  }
})
