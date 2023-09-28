import { BaseNode, Identifier } from "estree";

/**
 * Predicate function for determining `Identifier` nodes
 * @param node Node
 */
export const is_identifier_node = (node: BaseNode): node is Identifier => {
  return node.type === "Identifier";
};
