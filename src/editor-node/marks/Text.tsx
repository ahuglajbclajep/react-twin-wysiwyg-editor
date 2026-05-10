import { Node } from "@tiptap/core";

/**
 * @see https://www.tiptap.dev/api/nodes/text
 * @see https://github.com/ueberdosis/tiptap/blob/v3.17.1/packages/extension-text/src/text.ts
 */
export const Text = Node.create({
  name: "text",
  group: "inline",
});
