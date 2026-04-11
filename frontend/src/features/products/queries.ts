import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ProductsPage } from "./types";
import { getProducts, getProductByName } from "./api";

type UseProductsParams = {
  query?: string;
  category?: string;
  page: number;
  size?: number;
  sortBy?: string;
  direction?: string;
};

export function useProducts({ query, category, page, size, sortBy, direction }: UseProductsParams) {
  const PAGE_SIZE = size ?? 15
  return useQuery<ProductsPage>({
    queryKey: ["products",
      {
        query: query || null,
        category: category || null,
        page,
        PAGE_SIZE,
        sortBy: sortBy || null,
        direction: direction || null
      }
    ],
    queryFn: async () => {
      if (query) {
        const res = await getProductByName(query, page, PAGE_SIZE);
        return res.data;
      }
      const res = await getProducts({
        category,
        page,
        size: PAGE_SIZE,
        sortBy,
        direction,
      });
    
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
