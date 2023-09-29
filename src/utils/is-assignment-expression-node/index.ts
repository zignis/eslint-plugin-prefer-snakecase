import { BaseNode, AssignmentExpression } from "estree";

/**
 * Predicate function for determining `AssignmentExpression` nodes
 * @param node Node
 */
export const is_assignment_expression_node = (
  node?: BaseNode | null
): node is AssignmentExpression => {
  return Boolean(node?.type === "AssignmentExpression");
};
