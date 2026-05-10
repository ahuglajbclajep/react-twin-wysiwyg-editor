import { Node } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";

import { Component as ParagraphComponent } from "./Component";

/**
 * @see https://tiptap.dev/api/nodes/document
 * @see https://github.com/ueberdosis/tiptap/blob/v3.23.1/packages/extension-paragraph/src/paragraph.ts
 */
export const Paragraph = Node.create({
  name: "paragraph",
  group: "block",
  content: "inline*",

  parseHTML() {
    return [{ tag: "p" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["p", HTMLAttributes, 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(WrappedParagraph);
  },
});

const WrappedParagraph = () => {
  /**
   * 本来は、ReactNodeViewRenderer(WrappedParagraph, { contentDOMElementTag: "span" }) と、
   * <NodeViewContent as="span" /> で、NodeViewContent を span として描画するのが正しい。
   * 改行を消したときに消した文字が復活する現象が起きるため、暫定的に Component を div にして対処する
   */
  return (
    <NodeViewWrapper>
      <ParagraphComponent>
        <NodeViewContent />
      </ParagraphComponent>
    </NodeViewWrapper>
  );
};
