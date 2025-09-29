import type { Config } from "tailwindcss";
import preset from "@silo/config/tailwind";

const config: Config = {
  presets: [preset],
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;
