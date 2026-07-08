import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="mt-10 flex justify-center gap-2">
      {Array.from(
        { length: totalPages },
        (_, index) => (
          <button
            key={index}
            onClick={() =>
              onPageChange(index + 1)
            }
            className={`h-10 w-10 rounded-lg ${
              currentPage === index + 1
                ? "bg-black text-white"
                : "border"
            }`}
          >
            {index + 1}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;