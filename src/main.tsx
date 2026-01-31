import { createRoot } from "react-dom/client";
import "./index.css";
import clsx from "clsx/lite";
import { Editor } from "./editor/Editor";
import { Header } from "./components/Header";

const App = () => {
  return (
    <div
      className={clsx(
        "min-h-screen bg-bg font-sans text-sm text-text",
        "flex flex-col",
      )}
    >
      <Header />
      <main className="flex flex-1 justify-center px-4 py-8">
        <div
          className={clsx("w-full max-w-[720px]", "flex [&_.tiptap]:flex-1")}
        >
          <Editor />
        </div>
      </main>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
