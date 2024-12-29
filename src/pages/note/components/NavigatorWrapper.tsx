import { act, useEffect, useRef, useState } from "react";
import { INavigatorWrapperProp } from "./navigatorWrapper.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavigatorWrapper(props: INavigatorWrapperProp) {
  const { defaultWidth, activePage } = props;

  const [width, setWidth] = useState<number>(() => {
    let w = localStorage.getItem("NavigatorWrapperWidth");
    let wValue = w ? Number.parseInt(w) : null;
    return wValue || defaultWidth;
  });

  const [isResizing, setIsResizing] = useState<boolean>(false);
  const navigatorWrapperRef = useRef<HTMLDivElement>(null);

  const saveSizeData = function () {
    if (width) localStorage.setItem("NavigatorWrapperWidth", width.toString());
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    let wrapperBound = navigatorWrapperRef.current?.getBoundingClientRect();
    if (!wrapperBound) return;
    const newWidth = Math.max(100, e.clientX - wrapperBound.left);
    setWidth(newWidth);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    saveSizeData();
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <>
      <article
        ref={navigatorWrapperRef}
        className="col-2 h-100 note-page-container__navigator-wrapper position-relative"
        style={{ width: `${width}px` }}
      >
        <div className="row w-100">
          <button
            type="button"
            className="btn note-page-container__navigator-wrapper__add-page-btn d-block w-max-content"
          >
            <FontAwesomeIcon icon={"plus"} className="me-2" />
            Add Page
          </button>
          <button
            type="button"
            className="btn btn-default d-block w-max-content me-0 ms-auto"
          >
            <FontAwesomeIcon icon="arrow-down-wide-short" />
          </button>
        </div>
        <nav className="note-page-container__navigator w-100 row flex-column mt-4">
          <button
            type="button"
            className={
              "note-page-container__navigator__item btn btn-default " +
              (activePage === "default" ? "active" : "")
            }
          >
            Default
          </button>
        </nav>
        <div
          className="resizer"
          onMouseDown={handleMouseDown}
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            width: "10px",
            height: "100%",
            backgroundColor: "#3c3c3c",
            cursor: "col-resize",
          }}
        ></div>
      </article>
    </>
  );
}
