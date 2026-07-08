import React from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";

const ProductForm = ({
  defaultValues,
  onSubmit,
  submitText,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-xl border bg-white p-6"
    >
      <div>
        <input
          type="text"
          placeholder="Product Title"
          {...register("title", {
            required: "Title is required",
          })}
          className="w-full rounded-lg border p-3"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Brand"
          {...register("brand", {
            required: "Brand is required",
          })}
          className="w-full rounded-lg border p-3"
        />
        {errors.brand && (
          <p className="mt-1 text-sm text-red-500">
            {errors.brand.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Category"
          {...register("category", {
            required: "Category is required",
          })}
          className="w-full rounded-lg border p-3"
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-500">
            {errors.category.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="number"
          placeholder="Price"
          {...register("price", {
            required: "Price is required",
            min: 1,
          })}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <input
          type="number"
          placeholder="Stock"
          {...register("stock", {
            required: "Stock is required",
          })}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Thumbnail URL"
          {...register("thumbnail", {
            required: "Thumbnail is required",
          })}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <textarea
          rows={5}
          placeholder="Description"
          {...register("description")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <Button type="submit" className="w-full">
        {submitText}
      </Button>
    </form>
  );
};

export default ProductForm;