import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  loadProducts,
  addLocalProduct,
  updateLocalProduct,
  deleteLocalProduct,
} from "../features/products/productsSlice";
import { formatPrice } from "../utils/formatPrice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import EmptyState from "../components/common/EmptyState";

const ManageProducts = () => {
  const dispatch = useAppDispatch();
  const { apiProducts, localProducts, status } = useAppSelector((state) => state.products);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (status === "idle") dispatch(loadProducts());
  }, [status, dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const allProducts = [...localProducts, ...apiProducts];

  const openAddModal = () => {
    setEditingProduct(null);
    reset({ title: "", price: "", category: "", brand: "", description: "", thumbnail: "", stock: "" });
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    reset(product);
    setModalOpen(true);
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock) || 0,
    };
    if (editingProduct) {
      dispatch(updateLocalProduct({ ...payload, id: editingProduct.id }));
    } else {
      dispatch(addLocalProduct(payload));
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#111111] dark:text-white">Manage Products</h1>
        <Button onClick={openAddModal} className="flex items-center gap-2">
          <FiPlus size={16} /> Add Product
        </Button>
      </div>

      {allProducts.length === 0 ? (
        <EmptyState title="No products" subtitle="Add your first product to get started." />
      ) : (
        <div className="border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F8F8F8] dark:bg-neutral-900 text-neutral-500">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Product</th>
                <th className="text-left px-5 py-3 font-medium">Category</th>
                <th className="text-left px-5 py-3 font-medium">Price</th>
                <th className="text-left px-5 py-3 font-medium">Stock</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((p) => (
                <tr key={p.id} className="border-t border-[#E5E5E5] dark:border-neutral-800">
                  <td className="px-5 py-3 flex items-center gap-3">
                    <img
                      src={p.thumbnail || p.images?.[0]}
                      alt={p.title}
                      className="w-9 h-9 rounded-lg object-cover bg-[#F8F8F8] dark:bg-neutral-900"
                    />
                    <span className="text-[#111111] dark:text-white line-clamp-1">{p.title}</span>
                  </td>
                  <td className="px-5 py-3 text-neutral-500 capitalize">{p.category}</td>
                  <td className="px-5 py-3 text-[#111111] dark:text-white font-medium">
                    {formatPrice(p.price)}
                  </td>
                  <td className="px-5 py-3 text-neutral-500">{p.stock ?? "-"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {p.isLocal ? (
                        <>
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-2 rounded-lg hover:bg-[#F8F8F8] dark:hover:bg-neutral-800 text-[#111111] dark:text-white"
                          >
                            <FiEdit2 size={14} />
                          </button>
                          <button
                            onClick={() => dispatch(deleteLocalProduct(p.id))}
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-red-600"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-neutral-400">API Product</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#111111] dark:text-white">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-[#111111] dark:hover:text-white">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input label="Title" {...register("title", { required: "Title is required" })} error={errors.title?.message} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Price (USD)" type="number" step="0.01" {...register("price", { required: "Price is required" })} error={errors.price?.message} />
                <Input label="Stock" type="number" {...register("stock")} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Category" {...register("category", { required: "Category is required" })} error={errors.category?.message} />
                <Input label="Brand" {...register("brand")} />
              </div>
              <Input label="Thumbnail URL" placeholder="https://..." {...register("thumbnail", { required: "Thumbnail is required" })} error={errors.thumbnail?.message} />
              <div>
                <label className="block text-sm font-medium text-[#111111] dark:text-white mb-1.5">Description</label>
                <textarea
                  rows={4}
                  {...register("description", { required: "Description is required" })}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#E5E5E5] dark:border-neutral-700 bg-white dark:bg-[#1A1A1A] text-[#111111] dark:text-white"
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                {editingProduct ? "Save Changes" : "Add Product"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
