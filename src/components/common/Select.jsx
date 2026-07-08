import React from "react";

const Select = ({ children, className = "", ...props }) => {
  return (
    <select
      {...props}
      className={`w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-black ${className}`}
    >
      {children}
    </select>
  );
};

export default Select;