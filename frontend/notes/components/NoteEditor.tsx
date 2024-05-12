'use client'

import { deleteNote, saveNote } from "@/app/actions"
import NotePreview from "@/components/NotePreview"
import { ChangeEvent, useState } from "react"

type Props = {
  noteID: string,
  title: string,
  content: string,
}
const NoteEditor: React.FC<Props> = (props) => {
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)
  const isDraft = !props.noteID
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }
  return (
    <div className="w-full h-full flex items-center justify-center flex-col p-6 bg-white gap-6">
      <div className="w-full h-12 flex gap-6">
        <input className="box-border rounded-md h-full flex-1 border-[2px] p-2" type="text" value={title} onChange={onTitleChange} />
        <form className="h-full flex-1 flex justify-end items-center gap-6 ">
          <button
            formAction={() => saveNote(props.noteID, title, content)}
            type="submit"
            className="h-full w-32 rounded-3xl bg-sky-500 box-border text-white font-bold hover:bg-white hover:border-[2px] hover:border-sky-500 hover:text-black transition-all ease-in-out">DONE</button>
          {
            !isDraft &&
            <button
              formAction={() => deleteNote(props.noteID)}
              className="h-full w-32 rounded-3xl bg-white border-[2px] border-red-500 box-border text-red-500 hover:text-white hover:bg-red-500 transition-all ease-in-out">DELETE</button>
          }
        </form>
      </div>
      <div className="w-full h-full flex gap-6">
        <textarea className="h-full flex-1 border-[2px] rounded-md p-2" value={content} onChange={onContentChange} />
        <div className="h-full flex-1 flex flex-col gap-6">
          <div className="h-12 w-32 rounded-3xl bg-sky-500 text-white font-bold flex items-center justify-center select-none">
            PREVIEW
          </div>
          <div>
            <h1 className="text-[40px] font-bold">{title}</h1>
            <NotePreview >
              {content}
            </NotePreview>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteEditor
