# snake-case/snake-case

_This rule is included in `plugin:snake-case/recommended` preset._

🔧 The --fix option on the command line can automatically fix the problems reported by this rule.

## Rule Details

This rule is aimed at enforcing `snake_case` naming convention for identifiers.

Examples of **incorrect** code:

```js
/*eslint snake-case: "error"*/

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
/*eslint snake-case: "error"*/

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
/*eslint snake-case: ["error", "always", { "disableScreaming": true }]*/

const FOO_BAR = 1; // Invalid
```

### whitelist

- Type: `string[]`
- Default: `[]`

Array of custom identifiers to ignore.

```js
/*eslint snake-case: ["error", "always", { "whitelist": ["fooBar"] }]*/

const fooBar = 1; // Valid
```

### skip

- Type: `string[]`
- Default: `["NewExpression", "MemberExpression", "ClassDeclaration", "TSEnumDeclaration"]`

Array of AST node types to ignore. This also ignores the children of the nodes. [List of available AST node types](https://github.com/estree/estree/tree/master).

```js
/*eslint snake-case: ["error", "always", { "skip": ["FunctionDeclaration"] }]*/

function doSomething() {} // Valid
```
