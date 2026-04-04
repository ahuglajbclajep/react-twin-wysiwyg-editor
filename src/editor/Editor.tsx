import { EditorContent, useEditor } from "@tiptap/react";

import { Document } from "../editor-node/Document";
import { Paragraph } from "../editor-node/Paragraph";
import { Text } from "../editor-node/Text";
import { BlockSideMenu } from "./BlockSideMenu";

export const Editor = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    editorProps: { attributes: { class: "min-h-[90vh] focus:outline-none" } },
    autofocus: true,
  });

  return (
    <div className="relative overflow-y-hidden pl-[50px]">
      <EditorContent editor={editor} className="contents" />
      <BlockSideMenu editor={editor} />
    </div>
  );
};
