module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: ["react-app", "prettier"],
  plugins: ["react", "prettier"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        trailingComma: "es5",
        semi: false,
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "no-unused-vars": ["error"],
      },
    ],
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
