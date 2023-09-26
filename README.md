# eslint-plugin-prefer-snakecase

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/zignis/eslint-plugin-prefer-snakecase/CI?style=for-the-badge)
![npm](https://img.shields.io/npm/v/eslint-plugin-prefer-snakecase?style=for-the-badge)

Enforces `snake_case` naming convention for identifiers.

## Installation

### Yarn

```bash
yarn add -D eslint-plugin-prefer-snakecase
```

## Usage

Add `prefer-snakecase` to your list of plugins and extend the
recommended configuration.

```json
{
  "extends": "plugin:prefer-snakecase/recommended",
  "plugins": ["prefer-snakecase"]
}
```

## Rules

Available rules: https://github.com/zignis/eslint-plugin-prefer-snakecase/blob/main/docs/rules/prefer-snakecase.md
