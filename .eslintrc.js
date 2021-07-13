module.exports = {
  extends: [
    "@consenlabs-fe/eslint-config-ts",
    "prettier",
  ],
  parserOptions: {
    "project": "./tsconfig.json"
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
  },
};
