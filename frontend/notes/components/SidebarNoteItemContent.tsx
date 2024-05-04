"use client";
import type { Note } from "@/lib/redis";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
type Props = {
  noteID: string;
  note: Note;
  expandedChildren: React.ReactNode;
};

const SidebarNoteItemContent: React.FC<React.PropsWithChildren<Props>> = ({
  noteID,
  note,
  expandedChildren,
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selectID = pathname?.split("/")[2] || null;
  const [isPendin] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const isActive = noteID === selectID;
  return (
    <div
      className={clsx([
        "w-full bg-gray-50 relative p-2 transition-all ease-in-out border-2  rounded-lg hover:border-sky-400",
        isExpanded && "h-24",
        !isExpanded && "h-16",
        isActive ? "border-sky-400" : "border-gray-200",
      ])}
      onMouseMove={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      onClick={() => {
        router.push(`/note/${noteID}`);
      }}
    >
      {children}
      <button
        className={clsx(
          "transition-all ease-in-out absolute right-2 top-2 h-6 w-6 border border-sky-200 rounded-full text-sm hover:border-sky-500",
          { "opacity-0": !(isHover || isExpanded || isActive) },
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        X
      </button>
      {isExpanded && expandedChildren}
    </div>
  );
};

export default SidebarNoteItemContent;
