import { Document } from "../editor-node/Document";
import { EditorContent, useEditor } from "@tiptap/react";
import { Paragraph } from "../editor-node/Paragraph";
import { Text } from "../editor-node/Text";

export const Editor = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
  });

  return <EditorContent editor={editor} />;
};
