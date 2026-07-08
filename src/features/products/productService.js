import api from "../../services/api";

export const getProducts = async (limit = 12, skip = 0) => {
  const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await api.get(`/products/search?q=${query}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/products/categories");
  return response.data;
};