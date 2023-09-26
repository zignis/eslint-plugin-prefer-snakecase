import { to_snake_case } from "./to-snake-case";

describe("to_snake_case", () => {
  it("converts `camelCase`", () => {
    expect(to_snake_case("camelCase")).toEqual("camel_case");
  });

  it("converts `PascalCase`", () => {
    expect(to_snake_case("PascalCase")).toEqual("pascal_case");
  });

  it("converts `kebab-case`", () => {
    expect(to_snake_case("kebab-case")).toEqual("kebab_case");
  });

  it("handles an empty string", () => {
    expect(to_snake_case("")).toEqual("");
  });

  it("handles uppercase abbreviation at the start", () => {
    expect(to_snake_case("HTTPRequest")).toEqual("http_request");
  });

  it("handles uppercase abbreviation at the end", () => {
    expect(to_snake_case("requestHTTP")).toEqual("request_http");
  });

  it("replaces spaces and special characters with underscores", () => {
    expect(to_snake_case("some string")).toEqual("some_string");
    expect(to_snake_case("some-string")).toEqual("some_string");
    expect(to_snake_case("some.string")).toEqual("some_string");
  });

  it("handles mixed case and numbers", () => {
    expect(to_snake_case("Foo_bar123")).toEqual("foo_bar123");
  });

  it("handles a string with no valid words", () => {
    expect(to_snake_case("-$%#&")).toEqual("_");
  });

  it("handles a string with leading and trailing spaces", () => {
    expect(to_snake_case("  fooBar  ")).toEqual("foo_bar");
  });

  it("handles a string with consecutive spaces", () => {
    expect(to_snake_case("a   b   c")).toEqual("a_b_c");
  });

  it("handles a string with hyphens and underscores", () => {
    expect(to_snake_case("word-with-hyphens_and_underscores")).toEqual(
      "word_with_hyphens_and_underscores"
    );
  });

  it("handles a string with consecutive numbers", () => {
    expect(to_snake_case("word123and456more789")).toEqual(
      "word123and456more789"
    );
  });
});
