class Note {
  public id: string;
  public x: number;
  public y: number;
  public cardSize: { width: number; height: number } = { width: 0, height: 0 };
  public content: string;

  constructor({
    id,
    x,
    y,
    content,
  }: {
    id: string;
    x: number;
    y: number;
    content: string;
  }) {
    this.id = id;
    this.content = content;
    this.x = x;
    this.y = y;
  }
}

export default Note;
