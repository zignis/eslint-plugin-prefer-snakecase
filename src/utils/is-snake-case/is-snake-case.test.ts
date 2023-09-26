import { is_snake_case } from "./is-snake-case";

const VALID_CASES = [
  "$",
  "_",
  "foo",
  "foo0",
  "foo_bar",
  "foo_0_bar",
  "foo_bar_0",
  "_foo",
  "_foo_",
  "__foo__",
  "$foo_bar",
  "foo_$_bar",
  "foo_bar_$",
];
const INVALID_CASES = ["Foo", "FOO", "foo@bar", "fooBar"];

describe("is_snake_case", () => {
  VALID_CASES.forEach((test_case) => {
    it(`returns \`true\` for \`${test_case}\``, () => {
      expect(is_snake_case(test_case)).toBeTruthy();
    });
  });

  VALID_CASES.map((test_case) => test_case.toUpperCase()).forEach(
    (test_case) => {
      it(`returns \`true\` for \`${test_case}\` (Screaming)`, () => {
        expect(is_snake_case(test_case, true)).toBeTruthy();
      });
    }
  );

  INVALID_CASES.forEach((test_case) => {
    it(`returns \`false\` for \`${test_case}\``, () => {
      expect(is_snake_case(test_case)).toBeFalsy();
    });
  });

  ["FOO@BAR"].forEach((test_case) => {
    it(`returns \`false\` for \`${test_case}\` (Screaming)`, () => {
      expect(is_snake_case(test_case, true)).toBeFalsy();
    });
  });
});
