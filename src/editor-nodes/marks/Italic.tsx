import { Mark, markInputRule, markPasteRule } from "@tiptap/core";
import { MarkViewContent, ReactMarkViewRenderer } from "@tiptap/react";

import { Italic as ItalicComponent } from "../../nodes/marks/Italic";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    italic: {
      toggleItalic: () => ReturnType;
    };
  }
}

/**
 * Matches an italic to a *italic* on input.
 */
const starInputRegex = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/;
/**
 * Matches an italic to a *italic* on paste.
 */
const starPasteRegex = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g;
/**
 * Matches an italic to a _italic_ on input.
 */
const underscoreInputRegex = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/;
/**
 * Matches an italic to a _italic_ on paste.
 */
const underscorePasteRegex = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g;

/**
 * @see https://tiptap.dev/docs/editor/extensions/marks/italic
 * @see https://github.com/ueberdosis/tiptap/blob/v3.23.1/packages/extension-italic/src/italic.ts
 */
export const Italic = Mark.create({
  name: "italic",

  parseHTML() {
    return [
      { tag: "em" },
      { style: "font-style=italic" },
      {
        tag: "i",
        getAttrs: (node) => node.style.fontStyle !== "normal" && null,
      },
      // italic な要素の内側に normal な要素がある場合、その部分は italic にしない
      {
        style: "font-style=normal",
        clearMark: (mark) => mark.type.name === this.name,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["em", HTMLAttributes, 0];
  },

  addMarkView() {
    return ReactMarkViewRenderer(WrappedItalic);
  },

  addCommands() {
    return {
      toggleItalic:
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

const WrappedItalic = () => {
  return (
    <ItalicComponent>
      <MarkViewContent />
    </ItalicComponent>
  );
};
