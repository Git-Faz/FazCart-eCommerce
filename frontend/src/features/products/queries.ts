import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ProductsPage } from "./types";
import { getProducts, getProductByName } from "./api";

const PAGE_SIZE = 15;

type UseProductsParams = { query?: string; category?: string; page: number };

export function useProducts({ query, category, page }: UseProductsParams) {
  return useQuery<ProductsPage>({
    queryKey: ["products", { query: query || null, category: category || null, page }],
    queryFn: async () => {
      if (query) {
        const res = await getProductByName(query, page, PAGE_SIZE);
        return res.data;
      }
      if (category) {
        const res = await getProducts({
          category,
          page,
          size: PAGE_SIZE,
        });
        return res.data;
      }    
      const res = await getProducts({
        page,
        size: PAGE_SIZE,
      });
    
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
