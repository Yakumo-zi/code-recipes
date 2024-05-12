import EditButton from "@/components/EditButton";
import NoteListSkeleton from "@/components/NoteListSkeleton";
import SearchBar from "@/components/SearchBar";
import SidebarImport from "@/components/SidebarImport";
import SidebarNoteList from "@/components/SidebarNoteList";
import Link from "next/link";
import { Suspense } from "react";

const Sidebar: React.FC = async () => {

  return (
    <section className="h-screen w-1/5 bg-white items-center shadow-xl select-none">
      <Link href={"/"}>
        <section className="flex gap-6 w-full justify-center mt-8 items-center">
          <div className="w-8 h-8 bg-sky-300 rounded-full"></div>
          <strong className="text-sky-500 uppercase underline text-2xl decoration-4">
            React Notes
          </strong>
        </section>
      </Link>
      <section className="h-12 flex items-center p-1 gap-1 mt-4">
        <SearchBar />
        <EditButton>NEW</EditButton>
      </section>
      <nav className="mt-2">
        <Suspense fallback={<NoteListSkeleton />}>
          <SidebarNoteList />
        </Suspense>
      </nav>
      <SidebarImport />
    </section>
  );
};

export default Sidebar;
