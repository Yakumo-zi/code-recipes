'use client'

import SidebarItem from "@/components/SidebarItem"
import { Note } from "@/lib/redis"
import { useSearchParams } from "next/navigation"

type Props = {
  notes: Array<Record<string, Note>>
}
export default function NoteListFilter({ notes }: Props) {
  const searchParams = useSearchParams()
  const searchText = searchParams.get('q')
  return (
    <ul className="flex flex-col gap-4 justify-center items-center px-2 pt-2">
      {notes.map((note) => {
        const uuid = Object.keys(note)[0];
        if (!searchText || (searchText && note[uuid].title.toLowerCase().includes(searchText.toLowerCase())))
          return (
            <li key={uuid} className="w-full">
              <SidebarItem noteID={uuid} note={note[uuid]} />
            </li>
          );
      })}
    </ul>
  )

}
