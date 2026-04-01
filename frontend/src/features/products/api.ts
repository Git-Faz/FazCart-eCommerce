import api from "@/app/axios";
import type { Product, ProductsPage } from "./types";

export const getProducts = (params: {category?: string;page?: number;size?: number;}) => {
  return api.get<ProductsPage>("/products", { params });
};

export const getProductById = (id : number | string) =>{
    return api.get<Product>(`/products/${id}`)
}

export const getProductByName = (name: string, page: number, size: number) =>{
  return api.get<ProductsPage>("/products/search", {
    params: { name, page, size },
  });
}

