import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-300 border-t-black"></div>
    </div>
  );
};

export default Loader;