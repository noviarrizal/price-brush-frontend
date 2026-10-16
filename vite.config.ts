import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Vite 7 (Rollup) is pinned: Vite 8 (Rolldown) fails to build React Router
// route modules on Windows ("os error 123"). Revisit when fixed upstream.
export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
