import { Document } from "../editor-node/Document";
import { EditorContent, useEditor } from "@tiptap/react";
import { Paragraph } from "../editor-node/Paragraph";
import { Text } from "../editor-node/Text";
import clsx from "clsx/lite";

export const Editor = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    editorProps: { attributes: { class: editorStyle } },
  });

  return <EditorContent editor={editor} className="contents" />;
};

const editorStyle = clsx("pl-[40px] focus:outline-none");
