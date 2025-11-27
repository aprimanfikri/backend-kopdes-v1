import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "prisma/**/*",
      "**/generated/prisma/**/*",
      "**/.prisma/**/*",
      "node_modules/**",

      "dist/**",
      "build/**",
      ".out/**",

      ".env",
      ".env.*",

      "*.log",
      "logs/**",
      ".cache/**",

      ".DS_Store",
      "Thumbs.db",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
]);
