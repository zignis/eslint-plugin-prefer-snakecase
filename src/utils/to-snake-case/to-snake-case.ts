import { is_snake_case } from "../is-snake-case";

/**
 * Converts a string formatted in an arbitrary case to snake-case.
 * @param str Source string
 * @see https://stackoverflow.com/a/69878219
 */
export const to_snake_case = (str: string): string => {
  return is_snake_case(str, true)
    ? str.toLowerCase() // Convert SCREAMING_SNAKE_CASE to snake_case
    : str
        .trim()
        .replace(/([a-z])([A-Z]+)/g, (_, s1, s2) => s1 + " " + s2)
        .replace(
          /([A-Z])([A-Z]+)([^a-zA-Z0-9]*)$/,
          (_, s1, s2, s3) => s1 + s2.toLowerCase() + s3
        )
        .replace(
          /([A-Z]+)([A-Z][a-z])/g,
          (_, s1, s2) => s1.toLowerCase() + " " + s2
        )
        .replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join("_");
};
