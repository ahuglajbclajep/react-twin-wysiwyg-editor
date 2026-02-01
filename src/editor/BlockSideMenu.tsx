import { useState, useEffect, useCallback, useRef } from "react";
import clsx from "clsx/lite";
import type { EditorEvents } from "@tiptap/core";
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

  const onSelectionUpdate = useCallback(
    ({ editor }: EditorEvents["selectionUpdate"]) => {
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
    },
    [],
  );

  const menuRef = useRef<HTMLDivElement>(null);
  const onBlur = useCallback(
    ({ event: e }: EditorEvents["blur"]) => {
      // メニューがクリックされたときは、何もしない
      if (
        menuRef.current &&
        e.relatedTarget &&
        menuRef.current.contains(e.relatedTarget as Node)
      ) {
        return;
      }

      toFalse();
      currentNodeDom.current = null;
      setPosition(null);
    },
    [toFalse],
  );

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.on("focus", onSelectionUpdate);
    editor.on("selectionUpdate", onSelectionUpdate);
    editor.on("blur", onBlur);
    return () => {
      editor.on("focus", onSelectionUpdate);
      editor.off("selectionUpdate", onSelectionUpdate);
      editor.off("blur", onBlur);
    };
  }, [editor, onBlur, onSelectionUpdate]);

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
