import clsx from "clsx/lite";
import { MarkGithubIcon } from "@primer/octicons-react";

const REPO_URL = "https://github.com/ahuglajbclajep/react-twin-wysiwyg-editor";

export const Header = () => {
  return (
    <header
      className={clsx(
        "sticky top-0 z-10",
        "flex items-center justify-between gap-4",
        "border-b border-border bg-bg p-4",
      )}
    >
      <div className="min-w-0">
        <h1 className="truncate font-semibold text-text-strong">
          React Twin WYSIWYG Editor
        </h1>
        <p className="mt-0.5 truncate text-text-muted">
          Tiptap WYSIWYG editor reusing existing React components
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          className={clsx(
            "rounded-md border border-border bg-bg px-3 py-1.5",
            "hover:bg-bg-light",
          )}
        >
          プレビュー
        </button>
        <a
          href={REPO_URL}
          target="_blank"
          className="flex items-center hover:text-text-strong"
        >
          <MarkGithubIcon className="size-5" size={24} />
          <span className="ml-0.5">GitHub</span>
        </a>
      </div>
    </header>
  );
};
