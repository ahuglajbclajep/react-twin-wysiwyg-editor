import { Node } from "@tiptap/core";

/**
 * @see https://tiptap.dev/api/nodes/document
 * @see https://github.com/ueberdosis/tiptap/blob/v3.17.1/packages/extension-document/src/document.ts
 */
export const Document = Node.create({
  name: "doc",
  topNode: true,
  content: "block+",
});
