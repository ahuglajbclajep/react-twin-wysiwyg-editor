import { EditorContent, useEditor } from "@tiptap/react";

import { BlockSideMenu } from "./BlockSideMenu";
import { nodes, marks } from "../editor-nodes/extensions";

export const Editor = () => {
  const editor = useEditor({
    extensions: [...nodes, ...marks],
    editorProps: { attributes: { class: "min-h-[90vh] focus:outline-none" } },
    autofocus: true,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="relative overflow-y-hidden pl-[50px]">
      <EditorContent editor={editor} className="contents" />
      <BlockSideMenu editor={editor} />
    </div>
  );
};
