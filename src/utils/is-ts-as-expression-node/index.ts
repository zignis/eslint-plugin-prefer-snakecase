import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";
import { BaseNode } from "estree";

/**
 * Predicate function for determining `TSAsExpression` nodes
 * @param node Node
 */
export const is_ts_as_expression_node = (
  node?: BaseNode | TSESTree.BaseNode | null
): node is TSESTree.TSAsExpression => {
  return Boolean(node?.type === AST_NODE_TYPES.TSAsExpression);
};
