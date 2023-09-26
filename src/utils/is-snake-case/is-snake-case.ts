/**
 * Predicate function for determining strings formatted in snake-case.
 * @param str Source string
 * @param screaming Whether to check if the string is in `SCREAMING_SNAKE_CASE`
 */
export const is_snake_case = (str: string, screaming = false): boolean => {
  if (screaming) {
    return /^[A-Z_$][A-Z0-9_$]*$/.test(str);
  }

  return /^[a-z_$][a-z0-9_$]*$/.test(str);
};
