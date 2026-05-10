import { Mark, markInputRule, markPasteRule } from "@tiptap/core";
import { MarkViewContent, ReactMarkViewRenderer } from "@tiptap/react";

import { Bold as BoldComponent } from "../../nodes/marks/Bold";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    bold: {
      toggleBold: () => ReturnType;
    };
  }
}

/**
 * Matches bold text via `**` as input.
 */
export const starInputRegex =
  /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/;
/**
 * Matches bold text via `**` while pasting.
 */
export const starPasteRegex =
  /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g;
/**
 * Matches bold text via `__` as input.
 */
export const underscoreInputRegex =
  /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/;
/**
 * Matches bold text via `__` while pasting.
 */
export const underscorePasteRegex =
  /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g;

/**
 * @see https://tiptap.dev/docs/editor/extensions/marks/bold
 * @see https://github.com/ueberdosis/tiptap/blob/v3.23.1/packages/extension-bold/src/bold.tsx
 */
export const Bold = Mark.create({
  name: "bold",

  parseHTML() {
    return [
      { tag: "strong" },
      {
        tag: "b",
        getAttrs: (node) =>
          (node as HTMLElement).style.fontWeight !== "normal" && null,
      },
      // bold な要素の内側に normal な要素がある場合、その部分は bold にしない
      {
        style: "font-weight=400",
        clearMark: (mark) => mark.type.name === this.name,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["strong", HTMLAttributes, 0];
  },

  addMarkView() {
    return ReactMarkViewRenderer(WrappedBold);
  },

  addCommands() {
    return {
      toggleBold:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },

  addInputRules() {
    return [
      markInputRule({ find: starInputRegex, type: this.type }),
      markInputRule({ find: underscoreInputRegex, type: this.type }),
    ];
  },

  addPasteRules() {
    return [
      markPasteRule({ find: starPasteRegex, type: this.type }),
      markPasteRule({ find: underscorePasteRegex, type: this.type }),
    ];
  },
});

const WrappedBold = () => {
  return (
    <BoldComponent>
      <MarkViewContent />
    </BoldComponent>
  );
};
