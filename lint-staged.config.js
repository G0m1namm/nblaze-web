// lint-staged.config.js
module.exports = {
  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': [`eslint --fix`, `prettier --write`],

  // Format MarkDown and JSON
  '**/*.(md|json)': `prettier --write`
}
