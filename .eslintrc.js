/**
 * These rules enforce the Hack Reactor Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

module.exports = {
  extends: ['airbnb', 'prettier/react'],
  env: {
    browser: true,
  },
  plugins: ['react', 'jsx-a11y', 'import'],
};
