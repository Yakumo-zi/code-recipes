"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const SearchBar: React.FC<React.PropsWithChildren> = () => {
  const { replace } = useRouter()
  const pathName = usePathname()
  const [isPending, startTransition] = useTransition()
  function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search)
    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }
    startTransition(() => {
      replace(`${pathName}?${params.toString()}`)
    })
  }
  return (
    <input
      placeholder="Search note"
      className="transition-all ease-in-out border-2 px-1 h-full rounded-xl outline-none focus:border-sky-500"
      onChange={(e => { handleSearch(e.target.value) })}
    />
  );
};

export default SearchBar;
