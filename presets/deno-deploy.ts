import { NitroPreset } from "@nuxt/nitro";
import { join } from "path";
// https://v3.nuxtjs.org/docs/deployment/presets/custom

const denoDeployPreset: NitroPreset = {
  entry: join(__dirname, "../entries/deno-deploy"),
  node: false,
  commands: {
    preview: "deno run --A {{ output.serverDir }}/index.mjs",
  },
};

export default denoDeployPreset;
