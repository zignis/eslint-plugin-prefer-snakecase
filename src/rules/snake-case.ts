import { Rule } from "eslint";
import stringify from "json-stringify-safe";
import { DEFAULT_SKIP, PRIMITIVE_AND_BUILT_IN_TYPES } from "../constants";
import {
  is_pascal_case,
  is_snake_case,
  to_snake_case,
  is_property_node,
  is_identifier_node,
  is_import_specifier_node,
  is_export_specifier_node,
  is_jsx_attribute_node,
} from "../utils";

export const snake_case: Rule.RuleModule = {
  /* eslint-disable prefer-snakecase/prefer-snakecase */
  meta: {
    docs: {
      description: "Enforces `snake_case` naming for identifiers.",
      recommended: true,
      url: "https://github.com/zignis/eslint-plugin-prefer-snakecase/blob/main/docs/rules/prefer-snakecase.md",
    },
    schema: {
      type: "array",
      minItems: 0,
      maxItems: 2,
      items: [
        {
          enum: ["always", "never"],
        },
        {
          type: "object",
          properties: {
            disableScreaming: {
              type: "boolean",
            },
            allowPascalCase: {
              type: "boolean",
            },
            allowDestructuringPattern: {
              type: "boolean",
            },
            disableImportExportCheck: {
              type: "boolean",
            },
            whitelist: {
              type: "array",
              items: {
                type: "string",
              },
            },
            skip: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          additionalProperties: false,
        },
      ],
    },
    fixable: "code",
    type: "suggestion",
  },
  /* eslint-enable prefer-snakecase/prefer-snakecase */
  create(context) {
    const [, settings = {}] = context.options;
    const whitelist: string[] = Array.isArray(settings.whitelist)
      ? settings.whitelist
      : [];
    const skip: string[] = Array.isArray(settings.skip)
      ? settings.skip
      : DEFAULT_SKIP;
    const disable_screaming = Boolean(settings.disableScreaming);
    const disable_import_export_check = Boolean(
      settings.disableImportExportCheck
    );
    const allow_pascal_case = Boolean(settings.allowPascalCase);
    const allow_destructuring_pattern = Boolean(
      settings.allowDestructuringPattern
    );

    // noinspection JSUnusedGlobalSymbols
    return {
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      Identifier(node) {
        const name = node.name;

        if (
          !is_snake_case(name) &&
          !PRIMITIVE_AND_BUILT_IN_TYPES.includes(name) &&
          !whitelist.includes(name)
        ) {
          const attribute_node = node.parent?.parent?.parent?.parent; // Property -> ObjectExpression -> JSXExpressionContainer -> JSXAttribute

          // Skip the properties inside `style` JSX attribute
          if (
            is_jsx_attribute_node(attribute_node) &&
            attribute_node.name.name === "style"
          ) {
            return;
          }

          if (skip.includes(node.parent.type)) {
            return;
          }

          if (
            disable_import_export_check &&
            [node, node.parent].some(
              (node) =>
                is_import_specifier_node(node) || is_export_specifier_node(node)
            )
          ) {
            return;
          }

          // Handle PascalCase
          if (allow_pascal_case && is_pascal_case(name)) {
            return;
          }

          // Handle SCREAMING_SNAKE_CASE
          if (!disable_screaming && is_snake_case(name, true)) {
            return;
          }

          if (allow_destructuring_pattern) {
            try {
              const parent = JSON.parse(stringify(node.parent));

              if (
                is_import_specifier_node(parent) &&
                is_identifier_node(parent.local)
              ) {
                // Allows `import { someMod as some_mod } from 'some-mod';`
                if (is_snake_case(parent.local.name)) {
                  return;
                }
              } else if (
                is_export_specifier_node(parent) &&
                is_identifier_node(parent.exported)
              ) {
                // Allows `export { someMod as some_mod } from 'some-mod';`
                if (is_snake_case(parent.exported.name)) {
                  return;
                }
              } else if (
                is_property_node(parent) &&
                is_identifier_node(parent.value)
              ) {
                // Allows `{ someKey: some_key }`
                if (is_snake_case(parent.value.name)) {
                  return;
                }
              }
            } catch {
              // noop
            }
          }

          context.report({
            message: `Identifiers must be in snake_case: \`{{ identifier }}\` (${node.parent.type})`,
            node,
            data: {
              identifier: node.name,
            },
            fix(fixer) {
              return fixer.replaceText(node, to_snake_case(node.name));
            },
          });
        }
      },
    };
  },
};
