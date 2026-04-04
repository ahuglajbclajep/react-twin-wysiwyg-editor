import { createRoot } from "react-dom/client";
import "./index.css";
import clsx from "clsx/lite";
import { Editor } from "./editor/Editor";
import { Header } from "./components/Header";

const App = () => {
  return (
    <div
      className={clsx(
        "min-h-screen bg-bg font-sans text-base text-text",
        "flex flex-col",
      )}
    >
      <Header />
      <main className="mx-auto box-content w-full max-w-[720px] px-4 py-8">
        <Editor />
      </main>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
