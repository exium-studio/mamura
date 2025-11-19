const { FlatCompat } = require("@eslint/eslintrc");
const { dirname } = require("path");
const { fileURLToPath } = require("url");

const __filename = fileURLToPath(__filename);
const __dirname = dirname(__filename);

// Create compat instance for translating old-style extends
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = {
  root: true,
  env: { browser: true, es2020: true },

  // Equivalent to extends in the first config,
  // but now we include Next.js presets too.
  extends: [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],

  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ],

  parser: "@typescript-eslint/parser",

  plugins: ["react-refresh"],

  rules: {
    // From first config
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    // From second config
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-require-imports": "off",
    "react-hooks/exhaustive-deps": "off",
    "jsx-a11y/alt-text": "off",
  },
};
