import $axios from "./axios.instance";

export const addProduct = async (values) => {
  return await $axios.post("/product/add", values);
};

export const getProductDetails = async (id) => {
  return await $axios.get(`/product/details/${id}`);
};

export const getSellerProducts = async () => {
  return await $axios.post("/product/list/seller", {
    page: 1,
    limit: 6,
  });
};

export const deleteProduct = async (productId) => {
  return await $axios.delete(`/product/delete/${productId}`);
};
