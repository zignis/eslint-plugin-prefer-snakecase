import { BaseNode, ImportSpecifier } from "estree";

/**
 * Predicate function for determining `ImportSpecifier` nodes
 * @param node Node
 */
export const is_import_specifier_node = (
  node: BaseNode
): node is ImportSpecifier => {
  return node.type === "ImportSpecifier";
};
