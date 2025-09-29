module.exports = {
  extends: ["@silo/config/eslint"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
};
