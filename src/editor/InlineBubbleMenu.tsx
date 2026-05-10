import { type RefCallback, useCallback, useMemo } from "react";
import { clsx } from "clsx/lite";
import { BoldIcon, ItalicIcon } from "@primer/octicons-react";
import { type Editor, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";

import { IconButton } from "../components/IconButton";
import type { IconOnlyMenuItem } from "./types";

type Props = {
  editor: Editor;
};

export const InlineBubbleMenu = ({ editor }: Props) => {
  const { isBold, isItalic } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor.isActive("bold"),
      isItalic: editor.isActive("italic"),
    }),
  });

  const iconButtons = useMemo<IconOnlyMenuItem[]>(
    () => [
      {
        Icon: BoldIcon,
        key: "bold",
        onClick: () => editor.chain().focus().toggleBold().run(),
        isActive: isBold,
      },
      {
        Icon: ItalicIcon,
        key: "italic",
        onClick: () => editor.chain().focus().toggleItalic().run(),
        isActive: isItalic,
      },
    ],
    [editor, isBold, isItalic],
  );

  // BlockSideMenu より上に表示されていて欲しいので z-index を指定する
  // BubbleMenu の style/className では1つ内側にしか z-index が付けられないので、refcallback を使う
  const setOuterElementZIndex: RefCallback<HTMLElement> = useCallback(
    (el) => void (el && (el.style.zIndex = "1")),
    [],
  );

  return (
    <BubbleMenu editor={editor} ref={setOuterElementZIndex}>
      <div
        className={clsx(
          "flex overflow-clip rounded-lg bg-bg",
          "divide-x divide-border border border-border",
        )}
      >
        {iconButtons.map(
          ({ Icon, key, onClick, disabled = false, isActive = false }) => (
            <IconButton
              key={key}
              icon={Icon}
              size={24}
              onClick={onClick}
              disabled={disabled}
              className={clsx("p-2 text-icon", isActive && "bg-bg-light")}
            />
          ),
        )}
      </div>
    </BubbleMenu>
  );
};
