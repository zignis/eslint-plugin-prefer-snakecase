import { BaseNode, ExportSpecifier } from "estree";

/**
 * Predicate function for determining `ExportSpecifier` nodes
 * @param node Node
 */
export const is_export_specifier_node = (
  node: BaseNode
): node is ExportSpecifier => {
  return node.type === "ExportSpecifier";
};
