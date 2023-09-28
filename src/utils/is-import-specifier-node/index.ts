import { BaseNode, ImportSpecifier } from "estree";

/**
 * Predicate function for determining `ImportSpecifier` nodes
 * @param node Node
 */
export const is_import_specifier_node = (
  node?: BaseNode | null
): node is ImportSpecifier => {
  return Boolean(node?.type === "ImportSpecifier");
};
