module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // ✅ This line tells ESLint that Node globals like `module` are allowed
  },
  // ... rest of your config
};
