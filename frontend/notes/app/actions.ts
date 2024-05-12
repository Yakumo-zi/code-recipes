'use server'
import { Note, addNote, delNote, updateNote } from "@/lib/redis"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
export async function saveNote(noteID: string, title: string, body: string) {
  const data: Note = {
    title: title,
    content: body,
    updateTime: new Date().toString()
  }
  if (noteID) {
    updateNote(noteID, data)
    redirect(`/note/${noteID}`)
  } else {
    const res = await addNote(data)
    redirect(`/note/${res}`)
  }
}
export async function importNote(data: FormData) {

  const file = data.get('file') as File
  if (!file) {
    return {
      error: "File is required"
    }
  }

  const buffer = Buffer.from(await file.text())
  const title = file.name.split('.')[0]
  const res = await addNote({
    updateTime: new Date().toString(),
    title: title,
    content: buffer.toString('utf-8')
  })
  revalidatePath('/', 'layout')
  return res
}
export async function deleteNote(noteID: string) {
  delNote(noteID)
  redirect('/')
}
