import React from "react";

const Input = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-black ${className}`}
    />
  );
};

export default Input;