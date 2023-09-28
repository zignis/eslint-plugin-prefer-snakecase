import { BaseNode, Identifier } from "estree";

/**
 * Predicate function for determining `Identifier` nodes
 * @param node Node
 */
export const is_identifier_node = (
  node?: BaseNode | null
): node is Identifier => {
  return Boolean(node?.type === "Identifier");
};
