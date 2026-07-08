import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  return (
    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 transition hover:bg-neutral-100">
      <FiMoon size={20} />
    </button>
  );
};

export default ThemeToggle;