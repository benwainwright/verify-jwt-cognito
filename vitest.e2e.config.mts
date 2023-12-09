import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ["./src/test-support/setup-tests.ts"],
    globals: true,
    globalSetup: "./src/test-support/e2e-global-setup.ts",
    include: ["src/e2e-tests/**/*.spec.ts"],
  },
});
