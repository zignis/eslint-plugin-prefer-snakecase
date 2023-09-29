import { BaseNode, AssignmentPattern } from "estree";

/**
 * Predicate function for determining `AssignmentPattern` nodes
 * @param node Node
 */
export const is_assignment_pattern_node = (
  node?: BaseNode | null
): node is AssignmentPattern => {
  return Boolean(node?.type === "AssignmentPattern");
};
