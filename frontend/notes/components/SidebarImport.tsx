'use client'

import { importNote } from "@/app/actions"
import { useRouter } from "next/navigation"
import { ChangeEvent } from "react"

export default function SidebarImport() {
  const router = useRouter()
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target
    if (!fileInput.files || fileInput.files.length == 0) {
      return;
    }
    const file = fileInput.files[0]
    const formData = new FormData()
    formData.append('file', file)
    try {
      const noteID = await importNote(formData)
      router.push(`/note/${noteID}`)
    } catch (error) {

    }
    e.target.type = "text";
    e.target.type = "file";
  }
  return (
    <div className="flex items-center justify-center m-2 underline">
      <label htmlFor="file" style={{ cursor: "pointer" }}>Import .md File</label>
      <input type="file" id="file" name="file" style={{ position: "absolute", clip: "rect(0 0 0 0 )" }} accept=".md" onChange={onChange} />
    </div>
  )
}
