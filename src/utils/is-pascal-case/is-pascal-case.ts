/**
 * Predicate function for determining strings formatted in PascalCase.
 * @param str Source string
 */
export const is_pascal_case = (str: string): boolean => {
  return /^[A-Z][a-zA-Z0-9_$]*$/.test(str);
};
