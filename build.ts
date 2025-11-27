import dts from "bun-plugin-dts";
import type { BuildConfig } from "bun";

const defaultBuildConfig: BuildConfig = {
  entrypoints: ["./src/server/index.ts"],
  outdir: "./dist",
  target: "bun",
  minify: true,
  compile: true,
};

Promise.all([
  Bun.build({
    ...defaultBuildConfig,
    plugins: [dts()],
    format: "esm",
    naming: "[dir]/[name].js",
  }),
  Bun.build({
    ...defaultBuildConfig,
    format: "cjs",
    naming: "[dir]/[name].cjs",
  }),
]);
