import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open }) {
  let [containerEl, setContainerEl] = useState<HTMLElement>(null);

  const keypresshandler = (ev: KeyboardEvent): void => {
    if (ev.key === "Escape") {
      close();
    }
  };

  useEffect(() => {
    if (!process.browser) {
      return;
    }

    if (open && !containerEl?.isConnected) {
      window.addEventListener("keydown", keypresshandler);
      containerEl = window.document.createElement("div");
      containerEl.addEventListener("click", (ev) => {
        if (
          ev
            .composedPath()
            .some((t: HTMLElement) => "matches" in t && t?.matches("button, a"))
        ) {
          return;
        }
        close();
      });
      containerEl.classList.add("modal");
      setContainerEl(containerEl);
      const host = window.document.body;
      host?.appendChild(containerEl);
      document.body.style.overflow = "hidden";
    }

    if (!open && containerEl) {
      close();
    }
  }, [open]);

  useEffect(() => {
    return () => {
      close();
    };
  }, []);

  if (!open) {
    return null;
  } else if (containerEl) {
    return createPortal(
      <>
        <div className="backdrop"></div>
        {children}
      </>,
      containerEl
    );
  } else return null;

  function close() {
    containerEl?.remove();
    document.body.style.overflow = "auto";
    window.removeEventListener("keydown", keypresshandler);
  }
}
