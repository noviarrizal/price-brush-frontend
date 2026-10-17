import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("paint-calculator", "routes/paint-calculator.tsx"),
  route("decorating-quote-template", "routes/decorating-quote-template.tsx"),
] satisfies RouteConfig;
