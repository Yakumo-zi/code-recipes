import EditButton from "@/components/EditButton";
import NotePreview from "@/components/NotePreview";
import type { Note } from "@/lib/redis";
import dayjs from "dayjs";

type Props = {
  noteID: string;
  note: Note;
};

const Note: React.FC<Props> = ({ note, noteID }) => {
  return (
    <div className="w-full h-full">
      <div className="flex w-full h-24 items-center justify-between mb-8">
        <div className="flex flex-col justify-around">
          <small className="text-gray-500">
            Last updated on{" "}
            {dayjs(note.updateTime.toString()).format("YYYY-MM-DD hh:mm:ss")}
          </small>
          <h1 className="text-[40px] font-bold">{note.title}</h1>
        </div>
        <div className="h-10">
          <EditButton noteID={noteID}>Edit</EditButton>
        </div>
      </div>
      <NotePreview>{note.content}</NotePreview>
    </div>
  );
};

export default Note;
