module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "next/typescript"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "warn",
    "@next/next/no-html-link-for-pages": "off",
  },
  ignorePatterns: [".turbo", "node_modules", "dist", "build"],
};
