import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search Products...",
}) => {
  return (
    <div className="relative w-full">
      <FiSearch
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-black"
      />
    </div>
  );
};

export default SearchBar;