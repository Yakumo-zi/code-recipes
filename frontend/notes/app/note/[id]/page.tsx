import Note from "@/components/Note";
import { getNote } from "@/lib/redis";

export default async function Page({ params }: { params: { id: string } }) {
  const noteID = params.id;
  const note = await getNote(noteID);
  if (note == null) {
    return (
      <div>
        <span>Click a note on the left to view something! 🥺</span>
      </div>
    );
  }
  return (
    <div className="w-full h-full bg-white rounded-xl p-5">
      <Note noteID={noteID} note={note[noteID]} />
    </div>
  );
}
