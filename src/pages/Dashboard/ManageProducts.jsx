import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Button from "../../components/common/Button";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import { deleteProduct } from "../../features/products/productSlice";
import formatCurrency from "../../utils/formatCurrency";

const ManageProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.products.products
  );

  const [selectedId, setSelectedId] = useState(null);

  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteProduct(selectedId));

    setOpen(false);

    setSelectedId(null);
  };

  return (
    <div className="py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Manage Products
        </h1>

        <Link to="/dashboard/add-product">
          <Button>Add Product</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 text-left">
                Image
              </th>
              <th className="p-4 text-left">
                Product
              </th>
              <th className="p-4 text-left">
                Brand
              </th>
              <th className="p-4 text-left">
                Price
              </th>
              <th className="p-4 text-left">
                Stock
              </th>
              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t"
              >
                <td className="p-4">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                </td>

                <td className="p-4 font-medium">
                  {product.title}
                </td>

                <td className="p-4">
                  {product.brand}
                </td>

                <td className="p-4">
                  {formatCurrency(
                    product.price * 85
                  )}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/dashboard/edit-product/${product.id}`}
                    >
                      <Button variant="outline">
                        Edit
                      </Button>
                    </Link>

                    <Button
                      onClick={() => {
                        setSelectedId(product.id);
                        setOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDeleteModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ManageProducts;