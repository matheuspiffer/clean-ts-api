module.exports = {
  '*.{js,jsx,ts,tsx}': [
    "eslint 'src/**' --fix",
    'npm run test:staged'
  ]
}
