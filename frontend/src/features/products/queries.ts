import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ProductsPage, UseProductsParams } from "./types";
import { getProducts, getProductByName } from "./api";


export function useProducts({ query, category, page, size, sortBy, direction, minPrice, maxPrice }: UseProductsParams) {
  const PAGE_SIZE = size ?? 15
  return useQuery<ProductsPage>({
    queryKey: ["products",
      {
        query: query || null,
        category: category || null,
        page,
        PAGE_SIZE,
        sortBy: sortBy || null,
        direction: direction || null,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
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
        minPrice,
        maxPrice
      });
    
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
