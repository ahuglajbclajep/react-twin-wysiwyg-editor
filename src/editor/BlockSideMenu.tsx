import { useState, useEffect, useRef } from "react";
import clsx from "clsx/lite";
import { PlusIcon } from "@primer/octicons-react";

import type { EditorLike } from "./types";
import { useBooleanState } from "./useBooleanState";

type Props = {
  editor: EditorLike;
};

type Position = {
  top: number;
  left: number;
} | null;

export const BlockSideMenu = ({ editor }: Props) => {
  const [position, setPosition] = useState<Position>(null);
  const currentNodeDom = useRef<Element>(null);

  const [isShowMenu, _, toFalse, toggle] = useBooleanState();

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
      const { top, left } = nodeDOM.getBoundingClientRect();
      setPosition({
        top: top + window.scrollY,
        left: left - 50,
      });
    };

    editor.on("focus", onSelectionUpdate);
    editor.on("selectionUpdate", onSelectionUpdate);
    return () => {
      editor.on("focus", onSelectionUpdate);
      editor.off("selectionUpdate", onSelectionUpdate);
    };
  }, [editor]);

  // 選択中のブロックに対して .selected-block を付与する
  const prevNodeDom = useRef<Element>(null);
  useEffect(() => {
    if (!position) {
      prevNodeDom.current?.classList.remove("selected-block");
      return;
    }

    prevNodeDom.current?.classList.remove("selected-block");
    currentNodeDom.current?.classList.add("selected-block");
    prevNodeDom.current = currentNodeDom.current;
  }, [position]);

  // メニュー外がクリックされたらメニューを閉じる
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isShowMenu) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      // メニュー自身とエディタがクリックされたときは、何もしない
      if (menuRef.current && menuRef.current.contains(event.target as Node)) {
        return;
      }
      if (editor && editor.view.dom.contains(event.target as Node)) {
        return;
      }

      toFalse();
      currentNodeDom.current = null;
      setPosition(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editor, isShowMenu, toFalse]);

  if (!position) {
    return null;
  }

  return (
    <div
      className="absolute"
      style={{
        top: position.top,
        left: position.left,
      }}
      ref={menuRef}
    >
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
