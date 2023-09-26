import { is_pascal_case } from "./is-pascal-case";

const VALID_CASES = [
  "F",
  "Foo",
  "FOO",
  "F0",
  "FOO0",
  "FooBar",
  "FOO_BAR",
  "FOO$BAR",
  "Foo0Bar",
];
const INVALID_CASES = ["foo", "$FOO", "@foo"];

describe("is_pascal_case", () => {
  VALID_CASES.forEach((test_case) => {
    it(`returns \`true\` for \`${test_case}\``, () => {
      expect(is_pascal_case(test_case)).toBeTruthy();
    });
  });

  INVALID_CASES.forEach((test_case) => {
    it(`returns \`false\` for \`${test_case}\``, () => {
      expect(is_pascal_case(test_case)).toBeFalsy();
    });
  });
});
