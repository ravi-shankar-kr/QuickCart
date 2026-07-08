import React from "react";

const Textarea = ({ className = "", ...props }) => {
  return (
    <textarea
      {...props}
      className={`min-h-32 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-black ${className}`}
    />
  );
};

export default Textarea;