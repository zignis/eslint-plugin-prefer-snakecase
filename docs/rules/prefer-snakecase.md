# prefer-snakecase/prefer-snakecase

_This rule is included in `plugin:prefer-snakecase/recommended` preset._

🔧 The --fix option on the command line can automatically fix the problems reported by this rule.

## Rule Details

This rule is aimed at enforcing `snake_case` naming convention for identifiers.

Examples of **incorrect** code:

```js
/*eslint prefer-snakecase: "error"*/

var fooBar = 1;

function doSomething() {}

const obj = {
  someProp: null,
};

class SomeClass {
  someMethod() {}
}
```

Examples of **correct** code:

```js
/*eslint prefer-snakecase: "error"*/

var foo_bar = 1;

function do_something() {}

const obj = {
  some_prop: null,
};

class SomeClass {
  some_method() {}
}
```

## Options

### `disableScreaming`

- Type: `boolean`
- Default: `false`

Disallows the use of `SCREAMING_SNAKE_CASE` identifiers.

```js
/*eslint prefer-snakecase: ["error", "always", { "disableScreaming": true }]*/

const FOO_BAR = 1; // Invalid
```

### `allowPascalCase`

- Type: `boolean`
- Default: `false`

Allows the use of `PascalCase` identifiers. (Useful for React component declarations)

```js
/*eslint prefer-snakecase: ["error", "always", { "allowPascalCase": true }]*/

// Valid
const MyComponent = () => (
    <div>hello</div>
);
```

### whitelist

- Type: `string[]`
- Default: `[]`

Array of custom identifiers to ignore.

```js
/*eslint prefer-snakecase: ["error", "always", { "whitelist": ["fooBar"] }]*/

const fooBar = 1; // Valid
```

### skip

- Type: `string[]`
- Default: [Source](https://github.com/zignis/eslint-plugin-prefer-snakecase/blob/main/src/constants/index.ts#L4)

Array of AST node types to ignore. This also ignores the children of the nodes. [List of available AST node types](https://github.com/estree/estree/tree/master).

```js
/*eslint prefer-snakecase: ["error", "always", { "skip": ["FunctionDeclaration"] }]*/

function doSomething() {} // Valid
```

To skip all the default AST types, pass an array with an empty string:

```js
/*eslint prefer-snakecase: ["error", "always", { "skip": [""] }]*/
```
