import { createRoot } from "react-dom/client";
import "./index.css";
import clsx from "clsx/lite";
import { Editor } from "./editor/Editor";

const App = () => {
  return (
    <div
      className={clsx(
        "min-h-screen bg-bg-light px-4 py-8",
        "font-sans text-sm text-text",
      )}
    >
      <Editor />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
