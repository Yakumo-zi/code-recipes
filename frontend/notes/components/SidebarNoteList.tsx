import NoteListFilter from "@/components/NoteListFilter";
import { getAllNotes } from "@/lib/redis";

const SidebarNoteList: React.FC = async () => {
  const notes = await getAllNotes();
  if (notes.length == 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        {"No notes created yet!"}
      </div>
    );
  }
  return (
    <NoteListFilter notes={notes} />
  );
};

export default SidebarNoteList;
