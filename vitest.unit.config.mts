import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const paths = tsconfigPaths();

export default defineConfig({
  plugins: [paths],
  test: {
    setupFiles: ["./src/test-support/setup-tests.ts"],
    globals: true,
    include: ["src/lib/**/*.spec.ts"],
    coverage: {
      all: true,
      include: ["src/lib/**/*.ts"],
      provider: "istanbul",
      cleanOnRerun: true,
      reporter: ["text", "html", "lcov"],
      thresholds: {
        functions: 100,
        lines: 100,
        statements: 100,
        branches: 100,
      },
    },
  },
});
