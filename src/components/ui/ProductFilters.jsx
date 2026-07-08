import React from "react";

const ProductFilters = ({
  category,
  setCategory,
  sort,
  setSort,
  categories,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-lg border p-3"
      >
        <option value="">All Categories</option>

        {categories.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-lg border p-3"
      >
        <option value="">Sort</option>

        <option value="low">
          Price : Low to High
        </option>

        <option value="high">
          Price : High to Low
        </option>

        <option value="rating">
          Rating
        </option>

        <option value="name">
          Name
        </option>
      </select>
    </div>
  );
};

export default ProductFilters;