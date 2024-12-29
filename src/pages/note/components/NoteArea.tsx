import { useCallback, useRef, useState } from "react";
import { INoteAreaProps } from "./noteArea.interface";
import Note from "../../../models/Note";
import { Guid } from "typescript-guid";
import NoteItem from "./NoteItem";

export function NoteArea(props: INoteAreaProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteIdCounter, setNoteIdCounter] = useState<string>(
    Guid.create().toString()
  );
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const noteAreaRef = useRef<HTMLDivElement>(null);
  const idTimeoutResizing = useRef<NodeJS.Timeout | null>(null);

  const handleNoteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isResizing || !noteAreaRef.current || e.target !== noteAreaRef.current)
      return;
    // Get click position relative to the container
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Add a new note
    setNotes((prevNotes) => [
      ...prevNotes,
      { id: noteIdCounter, x, y, content: "" },
    ]);
    setNoteIdCounter((prev) => prev + 1);
  };

  const handleContentChange = useCallback(
    (id: string, value: string) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, content: value } : note
        )
      );
    },
    [setNotes]
  );

  const handleRemoveItem = useCallback(
    (id: string) => {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    },
    [setNotes]
  );

  const handleIsResizing = useCallback(
    function (value: boolean) {
      if (idTimeoutResizing.current) {
        clearTimeout(idTimeoutResizing.current);
      }
      idTimeoutResizing.current = setTimeout(() => {
        setIsResizing(value);
      }, 200);
    },
    [setIsResizing]
  );

  return (
    <>
      <div
        ref={noteAreaRef}
        onClick={handleNoteClick}
        style={{
          width: "100%",
          minHeight: "100vh",
          border: "1px solid #ddd",
          position: "relative",
          backgroundColor: "#f9f9f9",
          overflowX: "hidden",
        }}
      >
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            data={note}
            handleContentChange={handleContentChange}
            handleRemoveItem={handleRemoveItem}
            handleIsResizing={handleIsResizing}
          />
        ))}
      </div>
    </>
  );
}
