import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "shared", pattern: "src/shared/**/*" },
        { type: "entities", pattern: "src/entities/**/*" },
        { type: "features", pattern: "src/features/**/*" },
        { type: "widgets", pattern: "src/widgets/**/*" },
        { type: "views", pattern: "src/views/**/*" },
        { type: "app", pattern: "src/app/**/*" },
        { type: "proxy", pattern: "src/proxy.ts" },
      ],
      "boundaries/ignore": [
        "**/*.test.{ts,tsx}",
        "**/test/**/*",
        "src/test/**/*",
      ],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: { type: "shared" }, allow: { to: { type: "shared" } } },
            {
              from: { type: "entities" },
              allow: { to: { type: ["shared", "entities"] } },
            },
            {
              from: { type: "features" },
              allow: { to: { type: ["shared", "entities"] } },
            },
            {
              from: { type: "widgets" },
              allow: {
                to: { type: ["shared", "entities", "features", "widgets"] },
              },
            },
            {
              from: { type: "views" },
              allow: {
                to: {
                  type: ["shared", "entities", "features", "widgets", "views"],
                },
              },
            },
            {
              from: { type: "app" },
              allow: {
                to: {
                  type: [
                    "shared",
                    "entities",
                    "features",
                    "widgets",
                    "views",
                    "app",
                  ],
                },
              },
            },
            { from: { type: "proxy" }, allow: { to: { type: "shared" } } },
          ],
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "coverage/**",
  ]),
  eslintConfigPrettier,
]);

export default eslintConfig;
