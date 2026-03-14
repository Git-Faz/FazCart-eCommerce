import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ProductsPage } from "./types";
import { getAllProducts, getProductByName } from "./api";

const PAGE_SIZE = 15;

export function useProducts(query: string, page: number) {
  return useQuery<ProductsPage>({
    queryKey: ["products", query, page],
    queryFn: async () => {
      const response =
        query
          ? await getProductByName(query, page, PAGE_SIZE)
          : await getAllProducts(page, PAGE_SIZE);

      return response.data;
    },
    placeholderData: keepPreviousData,
  });
}
