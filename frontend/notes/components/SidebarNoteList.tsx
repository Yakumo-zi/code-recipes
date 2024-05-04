import SidebarItem from "@/components/SidebarItem";
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
    <ul className="flex flex-col gap-4 justify-center items-center px-2 pt-2">
      {notes.map((note) => {
        const uuid = Object.keys(note)[0];
        return (
          <li key={uuid} className="w-full">
            <SidebarItem noteID={uuid} note={note[uuid]} />
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarNoteList;
