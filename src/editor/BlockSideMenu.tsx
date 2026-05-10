import { useState, useRef, useEffect, useMemo } from "react";
import clsx from "clsx/lite";
import { PlusIcon, HeadingIcon } from "@primer/octicons-react";
import type { Editor } from "@tiptap/react";

import { useBooleanState } from "../components/useBooleanState";
import { IconButton } from "../components/IconButton";
import { LabeledMenuList } from "./LabeledMenuList";
import type { LabeledMenuItem } from "./types";

type Props = {
  editor: Editor;
};

export const BlockSideMenu = ({ editor }: Props) => {
  const [isShowMenu, _, toFalse, toggle] = useBooleanState();
  const [positionTop, setPositionTop] = useState<number | null>(null);

  const currentNodeDom = useRef<Element>(null);
  const prevNodeDom = useRef<Element>(null);

  // メニューの表示位置を計算する
  useEffect(() => {
    if (!editor) {
      return;
    }

    const onSelectionUpdate = () => {
      // React のレンダリングが終わってから getBoundingClientRect() をしないとチラつく
      requestAnimationFrame(() => {
        // カーソルがある doc 直下の Node を取得
        const $anchor = editor.state.selection.$anchor;
        const blockNodePos = $anchor.before(1);

        // その DOM 要素を取得
        const nodeDOM = editor.view.nodeDOM(blockNodePos);
        if (!(nodeDOM instanceof Element)) {
          return;
        }

        currentNodeDom.current = nodeDOM;

        // エディタ領域からの相対位置を計算する
        const nodeRect = nodeDOM.getBoundingClientRect();
        const editorRect = editor.view.dom.getBoundingClientRect();
        setPositionTop(nodeRect.top - editorRect.top);
      });
    };

    editor.on("focus", onSelectionUpdate);
    editor.on("selectionUpdate", onSelectionUpdate);
    return () => {
      editor.off("focus", onSelectionUpdate);
      editor.off("selectionUpdate", onSelectionUpdate);
    };
  }, [editor]);

  // 選択中のブロックに対して .selected-block を付与する
  useEffect(() => {
    prevNodeDom.current?.classList.remove("selected-block");
    currentNodeDom.current?.classList.add("selected-block");
    prevNodeDom.current = currentNodeDom.current;
  }, [positionTop]);

  // メニュー外がクリックされたらメニューを閉じる
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isShowMenu) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      // メニュー自身がクリックされたときは、何もしない
      if (menuRef.current && menuRef.current.contains(event.target as Node)) {
        return;
      }

      toFalse();
      currentNodeDom.current = null;
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editor, isShowMenu, toFalse]);

  if (positionTop === null) {
    return null;
  }

  return (
    <div
      className={clsx(
        "absolute left-0",
        // この領域の背後のテキストもクリックできるようにする
        "pointer-events-none *:pointer-events-auto",
      )}
      style={{ top: positionTop }}
      ref={menuRef}
    >
      <IconButton
        icon={PlusIcon}
        size={24}
        className={clsx(
          "rounded-full border border-border p-1 focus:outline-none",
          "text-text-muted transition-transform",
          isShowMenu && "rotate-45",
        )}
        onClick={toggle}
      />
      {isShowMenu && <BlockSideMenuItems editor={editor} onClose={toFalse} />}
    </div>
  );
};

type BlockSideMenuItemsProps = {
  editor: Editor;
  onClose: () => void;
};

const BlockSideMenuItems = ({ editor, onClose }: BlockSideMenuItemsProps) => {
  const menuItems = useMemo<LabeledMenuItem[]>(
    () => [
      {
        Icon: HeadingIcon,
        label: "Heading 1",
        onClick: () => {
          onClose();
          editor.chain().focus().run();
        },
      },
      {
        Icon: HeadingIcon,
        label: "Heading 2",
        onClick: () => {
          onClose();
          editor.chain().focus().run();
        },
      },
      {
        Icon: HeadingIcon,
        label: "Heading 3",
        onClick: () => {
          onClose();
          editor.chain().focus().run();
        },
      },
    ],
    [editor, onClose],
  );

  return <LabeledMenuList menuItems={menuItems} className="mt-1" />;
};
