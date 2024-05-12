import NoteEditor from "@/components/NoteEditor"
import { getNote } from "@/lib/redis"

export default async function Page({ params }: { params: { id: string } }) {
  const note = await getNote(params.id)
  if (note == null) {
    <div >
      <span>
        Click a note on the left to view something! 🥺
      </span>
    </div>
  }
  return <NoteEditor noteID={params.id} title={note.title} content={note.content} />
}

