import Note from "../../../models/Note";

export interface INoteItemProps {
  data: Note;
  handleContentChange: (id: string, content: string) => any;
  handleRemoveItem: (id: string) => any;
  handleIsResizing: (value: boolean) => any;
}
