import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// Kept separate from vite.config.ts so unit tests don't load the React Router plugin.
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ["app/**/*.test.{ts,tsx}"],
  },
});
