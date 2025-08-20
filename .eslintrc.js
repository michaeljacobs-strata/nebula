module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking",
    "prettier", // Disables ESLint rules that conflict with Prettier
  ],
  rules: {
    // TypeScript specific rules
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/prefer-const": "error",

    // General rules
    "no-console": "warn",
    "prefer-const": "error",
    "no-var": "error",

    // Node.js specific
    "node/no-unsupported-features/es-syntax": "off",
  },
  env: {
    node: true,
    es2020: true,
  },
  ignorePatterns: ["dist/", "node_modules/", "*.js"],
};
