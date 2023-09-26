import { Rule } from "eslint";
import { DEFAULT_FILTER, PRIMITIVE_AND_BUILT_IN_TYPES } from "../constants";
import { is_snake_case, to_snake_case } from "../utils";

export const snake_case: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Enforces `snake_case` naming for identifiers.",
      recommended: true,
      url: "https://github.com/zignis/eslint-plugin-snake-case/blob/main/docs/rules/snake-case.md",
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
  create(context) {
    const [, settings = {}] = context.options;
    const whitelist: string[] = Array.isArray(settings.whitelist)
      ? settings.whitelist
      : [];
    const skip: string[] = Array.isArray(settings.skip)
      ? settings.skip
      : DEFAULT_FILTER;
    const disable_screaming = Boolean(settings.disableScreaming);

    // noinspection JSUnusedGlobalSymbols
    return {
      Identifier(node) {
        const name = node.name;

        if (
          !is_snake_case(name) &&
          !PRIMITIVE_AND_BUILT_IN_TYPES.includes(name) &&
          !whitelist.includes(name)
        ) {
          if (skip.includes(node.parent.type)) {
            return;
          }

          // Handle SCREAMING_SNAKE_CASE
          if (!disable_screaming && is_snake_case(name, true)) {
            return;
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
