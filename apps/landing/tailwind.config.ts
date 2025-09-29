import type { Config } from "tailwindcss";
import preset from "@silo/config/tailwind";

const config: Config = {
  presets: [preset],
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at top left, rgba(76, 110, 245, 0.18), transparent 60%)",
      },
    },
  },
};

export default config;
