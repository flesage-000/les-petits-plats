export default {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "amd": true,
    "module": true
  },
  "extends": [
    'standard'
  ],
  "parserOptions": {
    "ecmaVersion": 'latest',
    "sourceType": 'module'
  },
  "rules": {
    "no-console": "off",
    "no-invalid-regexp": "warn",
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "no-undef":"off"
  }
}