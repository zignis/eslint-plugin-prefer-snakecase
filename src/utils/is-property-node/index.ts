import { BaseNode, Property } from "estree";

/**
 * Predicate function for determining `Property` nodes
 * @param node Node
 */
export const is_property_node = (node?: BaseNode | null): node is Property => {
  return Boolean(node?.type === "Property");
};
