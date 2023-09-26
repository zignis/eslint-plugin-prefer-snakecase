import { RuleTester } from "eslint";
import { snake_case } from "./snake-case";

const tester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
});

tester.run("snake-case", snake_case, {
  valid: [
    "const foo_bar = 1;",
    "const foo_0_bar = 1;",
    "const foo_bar_0 = 1;",
    "const FOO_BAR = 1;", // Screaming snake case is enabled by default
    "function do_something() {}",
    "const do_something = () => {}",
    "new Function()",
    "new Date().toString()",
    "({}).doSomething?.()",
    "parseFloat('0.5')",
    "class SomeClass {}",
    "enum SomeEnum {}",
    {
      code: "const fooBar = 1;",
      options: ["always", { whitelist: ["fooBar"] }],
    },
  ],
  invalid: [
    {
      code: "const fooBar = 1;",
      output: "const foo_bar = 1;",
      errors: [
        {
          message:
            "Identifiers must be in snake_case: `fooBar` (VariableDeclarator)",
        },
      ],
    },
    {
      code: "const FOO_BAR = 1;",
      output: "const foo_bar = 1;",
      options: ["always", { disableScreaming: true }],
      errors: [
        {
          message:
            "Identifiers must be in snake_case: `FOO_BAR` (VariableDeclarator)",
        },
      ],
    },
    {
      code: "const obj = { someProp: true };",
      output: "const obj = { some_prop: true };",
      errors: [
        {
          message: "Identifiers must be in snake_case: `someProp` (Property)",
        },
      ],
    },
    {
      code: "function doSomething() {}",
      output: "function do_something() {}",
      errors: [
        {
          message:
            "Identifiers must be in snake_case: `doSomething` (FunctionDeclaration)",
        },
      ],
    },
    {
      code: `
        class SomeClass {
          private someMethod(): void {}
        }
      `,
      output: `
        class SomeClass {
          private some_method(): void {}
        }
      `,
      errors: [
        {
          message:
            "Identifiers must be in snake_case: `someMethod` (MethodDefinition)",
        },
      ],
    },
  ],
});
