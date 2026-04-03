import { useState, useEffect, useRef } from "react";
import clsx from "clsx/lite";
import { PlusIcon } from "@primer/octicons-react";

import type { EditorLike } from "./types";
import { useBooleanState } from "./useBooleanState";

type Props = {
  editor: EditorLike;
};

export const BlockSideMenu = ({ editor }: Props) => {
  const [isShowMenu, _, toFalse, toggle] = useBooleanState();
  const [positionTop, setPositionTop] = useState(0);

  // 選択中のブロックに対して .selected-block を付与する
  const currentNodeDom = useRef<Element>(null);
  const prevNodeDom = useRef<Element>(null);
  useEffect(() => {
    prevNodeDom.current?.classList.remove("selected-block");
    currentNodeDom.current?.classList.add("selected-block");
    prevNodeDom.current = currentNodeDom.current;
  }, [positionTop]);

  // メニューの表示位置を計算する
  useEffect(() => {
    if (!editor) {
      return;
    }

    const onSelectionUpdate = () => {
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
      const editorRect = editor.view.dom.getBoundingClientRect();
      const nodeRect = nodeDOM.getBoundingClientRect();
      setPositionTop(nodeRect.top - editorRect.top);
    };

    editor.on("focus", onSelectionUpdate);
    editor.on("selectionUpdate", onSelectionUpdate);
    return () => {
      editor.off("focus", onSelectionUpdate);
      editor.off("selectionUpdate", onSelectionUpdate);
    };
  }, [editor]);

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

  return (
    <div className="absolute left-0" style={{ top: positionTop }} ref={menuRef}>
      <button
        className={clsx(
          "flex size-8 cursor-pointer items-center justify-center",
          "rounded-full border border-border bg-bg focus:outline-none",
        )}
        onClick={toggle}
      >
        <PlusIcon
          size={24}
          className={clsx(
            "text-text-muted transition-transform",
            isShowMenu && "rotate-45",
          )}
        />
      </button>
      {isShowMenu && <BlockSideMenuItems onClose={toFalse} />}
    </div>
  );
};

type BlockSideMenuItemsProps = {
  onClose: () => void;
};

const BlockSideMenuItems = ({ onClose }: BlockSideMenuItemsProps) => {
  return (
    <div
      className={clsx(
        "mt-1 min-w-[200px] rounded-sm bg-bg shadow-sm shadow-gray-500",
        "divide-y divide-border-light",
      )}
      onClick={onClose}
    >
      <button className="flex w-full p-2 hover:bg-bg-light">ここに項目</button>
      <button className="flex w-full p-2 hover:bg-bg-light">ここに項目</button>
    </div>
  );
};
