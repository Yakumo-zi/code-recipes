"use client";

import { useState } from "react";

const SearchBar: React.FC<React.PropsWithChildren> = () => {
  const [content, setContent] = useState("");
  return (
    <input
      placeholder="Search note"
      className="transition-all ease-in-out border-2 px-1 h-full rounded-xl outline-none focus:border-sky-500"
      onInput={(e) => {}}
      value={content}
    />
  );
};

export default SearchBar;
