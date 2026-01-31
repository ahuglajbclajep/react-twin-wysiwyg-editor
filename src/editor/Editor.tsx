import clsx from "clsx/lite";
import { EditorContent, useEditor } from "@tiptap/react";

import { Document } from "../editor-node/Document";
import { Paragraph } from "../editor-node/Paragraph";
import { Text } from "../editor-node/Text";
import { BlockSideMenu } from "./BlockSideMenu";

export const Editor = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    editorProps: { attributes: { class: editorStyle } },
  });

  return (
    <>
      <EditorContent editor={editor} className="contents" />
      <BlockSideMenu editor={editor} />
    </>
  );
};

const editorStyle = clsx("pl-[40px] focus:outline-none");
