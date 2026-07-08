import React from "react";

const EmptyState = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <p className="text-neutral-500">{description}</p>
    </div>
  );
};

export default EmptyState;