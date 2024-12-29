import { useEffect, useRef, useState } from "react";
import { INoteItemProps } from "./noteItem.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextareaAutosize from "react-textarea-autosize";
import Draggable from "react-draggable";

function NoteItem(props: INoteItemProps) {
  const {
    data: note,
    handleContentChange,
    handleRemoveItem,
    handleIsResizing,
  } = props;
  const [showRemoveBtn, _] = useState<boolean>(true);
  const [width, setWidth] = useState<number>(300);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [disableDrag, setDisableDrag] = useState<boolean>(true);
  const enableDragLineRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDisableDrag(true);
    setIsResizing(true);
    handleIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    let wrapperBound = textareaRef.current?.getBoundingClientRect();
    if (!wrapperBound) return;
    const newWidth = Math.max(100, e.clientX - wrapperBound.left);
    setWidth(newWidth);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    handleIsResizing(false);
  };

  const handleClickEnableDrag = (evt: React.MouseEvent) => {
    if (evt.target === enableDragLineRef.current) {
      setDisableDrag(false);
    } else {
      setDisableDrag(true);
    }
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
    <Draggable disabled={disableDrag}>
      <div
        key={note.id}
        onDoubleClick={() => setDisableDrag(true)}
        style={{
          position: "absolute",
          top: `${note.y}px`,
          left: `${note.x}px`,
          resize: "none",
          width: `${width}px`,
          height: "max-content",
          border: "1px solid rgb(84, 72, 255)",
          padding: "0",
          borderRadius: "5px",
          paddingRight: "5px",
          cursor: disableDrag ? "default" : "grab",
        }}
      >
        <div
          ref={enableDragLineRef}
          style={{
            width: "100%",
            height: "10px",
            background: "rgb(200,200,200)",
          }}
          onMouseDown={handleClickEnableDrag}
        ></div>
        {showRemoveBtn && (
          <button
            type="button"
            className="btn border-none position-absolute"
            style={{ top: "-30px", right: "-0.5rem" }}
            onClick={() => handleRemoveItem(note.id)}
          >
            <FontAwesomeIcon icon={"close"} />
          </button>
        )}
        <TextareaAutosize
          ref={textareaRef}
          className="form-control d-flex w-100"
          rows={2}
          value={note.content}
          onFocus={() => setDisableDrag(true)}
          onChange={(e) => handleContentChange(note.id, e.target.value)}
          style={{
            borderRadius: "0 0 0 5px",
            border: "none",
            boxShadow: "none",
            background: !disableDrag ? "rgb(230, 230,230)" : "white",
            cursor: disableDrag ? "text" : "grab",
          }}
          autoFocus
        />
        <div
          onMouseDown={handleMouseDown}
          className="resizer"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "5px",
            height: "100%",
            background: !disableDrag ? "rgb(230, 230,230)" : "white",
            cursor: "col-resize",
            borderRadius: "0 5px 5px 0",
          }}
        ></div>
      </div>
    </Draggable>
  );
}

export default NoteItem;
