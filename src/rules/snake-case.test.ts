import { RuleTester } from "eslint";
import { snake_case } from "./snake-case";

const tester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  /* eslint-disable prefer-snakecase/prefer-snakecase */
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  /* eslint-enable prefer-snakecase/prefer-snakecase */
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
    "type SomeType = string",
    "interface SomeInterface {}",
    {
      code: `
        const { someProp: some_prop } = {};
        const { 
          someProp: some_prop,
          otherProp: other_prop,
          snake_prop,
          normal
        } = {};
      `,
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: ["always", { allowDestructuringPattern: true }],
    },
    {
      code: "const fooBar = 1;",
      options: ["always", { whitelist: ["fooBar"] }],
    },
    {
      code: "import { some, otherMod as other_mod } from 'some';",
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: ["always", { allowDestructuringPattern: true }],
    },
    {
      code: "export { some, otherMod as other_mod }",
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: ["always", { allowDestructuringPattern: true }],
    },
    `
      enum SomeEnum {
        SOME_VALUE,
        otherValue
      }  
    `,
    `
      type A = string;
      type B = { some_key: A }
    `,
    // https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-types
    `
      interface GenericIdentityFn<Type> {
        (arg: Type): Type;
      }
       
      function identity<Type>(arg: Type): Type {
        return arg;
      }
       
      let my_identity: GenericIdentityFn<number> = identity;
    `,
    // https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes
    `
      class GenericNumber<NumType> {
        zero_value: NumType;
        add: (x: NumType, y: NumType) => NumType;
      }
    `,
    // https://www.typescriptlang.org/docs/handbook/2/generics.html#using-class-types-in-generics
    `
      class BeeKeeper {
        has_mask: boolean = true;
      }
       
      class ZooKeeper {
        name_tag: string = "Mikle";
      }
       
      class Animal {
        num_legs: number = 4;
      }
       
      class Bee extends Animal {
        num_legs = 6;
        keeper: BeeKeeper = new BeeKeeper();
      }
       
      class Lion extends Animal {
        keeper: ZooKeeper = new ZooKeeper();
      }
       
      function create_instance<A extends Animal>(c: new () => A): A {
        return new c();
      }
       
      create_instance(Lion).keeper.name_tag;
      create_instance(Bee).keeper.has_mask;
    `,

    `
      type DeepPartial<T> = {
        [K in keyof T]?: T[K] extends object
          ? DeepPartial<T[K]>
          : T[K];
      };
      
      type Flatten<T> = T extends Array<infer U>
        ? U
        : T extends object
        ? { [K in keyof T]: T[K] }
        : T;
      
      type Combine<T> = T extends object
        ? Flatten<{ [K in keyof T]: T[K] }>
        : T;
      
      type TupleToUnion<T> = T extends [infer U, ...infer Rest]
        ? U | TupleToUnion<Rest>
        : T;
    `,
    {
      code: `
        const Component = () => (
            <Other camelCaseAttr={true} />
        ); 
      `,
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: ["always", { allowPascalCase: true }],
    },
    {
      code: `
        const Component = () => (
            <div 
              style={{
                  backgroundColor: "rebeccapurple",
                  fontSize: "14px",
                  lineHeight: 1.875
              }} 
            />
        ); 
      `,
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: ["always", { allowPascalCase: true }],
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
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
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
      code: "const { someProp: other_prop } = {};",
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: ["always", { allowDestructuringPattern: true }],
      output: "const { some_prop: other_prop } = {};",
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
