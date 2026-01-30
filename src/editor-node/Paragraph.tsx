import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
import { Paragraph as ParagraphComponent } from "../node/Paragraph";

/**
 * @see https://tiptap.dev/api/nodes/document
 * @see https://github.com/ueberdosis/tiptap/blob/v3.17.1/packages/extension-paragraph/src/paragraph.ts
 */
export const Paragraph = Node.create({
  name: "paragraph",
  group: "block",
  content: "inline*",

  parseHTML() {
    return [
      // React が実際に吐く HTML タグを Tiptap の実装が知っていて欲しくない
      // アプリ内では data 属性を使って、React の実装と切り離してノードを扱う
      { tag: '[data-node="p"]' },
      // 外部サイトからペーストされたときのための設定
      { tag: "p" },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "p", // 外部サイトとの互換性のために一般的なタグも指定しておく
      mergeAttributes(HTMLAttributes, { "data-node": "p" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(WrappedParagraph);
  },
});

const WrappedParagraph = () => {
  return (
    <NodeViewWrapper>
      <ParagraphComponent>
        <NodeViewContent />
      </ParagraphComponent>
    </NodeViewWrapper>
  );
};
