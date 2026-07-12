import axiosInstance from "./axiosInstance";
import { PRODUCT_LIMIT } from "../constants/api";

export const fetchAllProducts = async () => {
  const response = await axiosInstance.get(
    `/products?limit=${PRODUCT_LIMIT}`
  );
  return response.data.products;
};

export const fetchProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axiosInstance.get(`/products/categories`);
  return response.data;
};
