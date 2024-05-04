import SidebarNoteItemContent from "@/components/SidebarNoteItemContent";
import type { Note } from "@/lib/redis";
import dayjs from "dayjs";
type Props = {
  noteID: string;
  note: Note;
};

const SidebarItem: React.FC<Props> = ({ noteID, note }) => {
  const { title, content = "", updateTime } = note;
  return (
    <SidebarNoteItemContent
      noteID={noteID}
      note={note}
      expandedChildren={
        <p>{content.substring(0, 20) || <i>(No content)</i>}</p>
      }
    >
      <header className="flex flex-col">
        <strong className="text-lg font-bold">{title}</strong>
        <small>
          {dayjs(updateTime.toString()).format("YYYY-MM-DD hh:mm:ss")}
        </small>
      </header>
    </SidebarNoteItemContent>
  );
};

export default SidebarItem;
