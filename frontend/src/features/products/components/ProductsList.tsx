import { type JSX, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "@/features/products/components/ProductCard";
import placeholder from "@/assets/images/placeholder.jpg";
import { useAddToCart } from "@/features/cart/mutation";
import { toast } from "sonner";
import Loading from "@/shared/components/ui/myUI/Loading";
import Error from "@/shared/components/ui/myUI/Error";
import { useAuth } from "@/features/auth/useAuth";
import { useProducts } from "../queries";
import { type ProductsListProps } from "../types";
import { cn } from "@/shared/utils/utils";

export default function ProductsList({ query: propQuery, category: propCategory, hidePagination = false, size, className }
  : ProductsListProps): JSX.Element {
  const [searchParams] = useSearchParams();

  const query =
    propQuery ?? searchParams.get("name")?.trim()?.toLowerCase() ?? "";

  const category = propCategory ?? searchParams.get("category") ?? undefined;

  const [page, setPage] = useState(0);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isError } = useProducts({
    query: query,
    page,
    category,
    ...(size !== undefined && { size }), 
  });
  const { mutate: addToCart, isPending } = useAddToCart();

  const products = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    setPage(0);
  }, [query]);
 console.log("SIZE:", size);
  function handleAddToCart(prodId: number, qty = 1) {
    if (!isLoggedIn) {
      toast.info(
        <>
          <Link to="/auth" className="underline">
            Login
          </Link>{" "}
          to add items to cart
        </>,
      );
      return;
    }
    addToCart(
      { productId: prodId, quantity: qty },
      {
        onSuccess: () => {
          toast.success("Item added to cart!");
        },
        onError: () => {
          toast.error("Failed to add item to cart");
        },
      },
    );
  }

  if (isLoading || isFetching) return <Loading message="Loading Products..." />;

  if (isError) {
    return <Error errorMsg="Could not load products..." />;
  }

  return (
    <div className={cn("w-full px-2 sm:px-3 md:px-1 lg:px-0 bg-transparent", className)}>
      <div className= "grid grid-cols-2 gap-5 sm:gap-4 md:grid-cols-[repeat(auto-fit,minmax(220px,220px))] md:justify-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            img={{
              link: product.imageUrl || placeholder,
              alt: "product image",
            }}
            name={product.name}
            price={product.price}
            onClick={() => navigate(`/products/${product.id}`)}
            onBtnClick={() => handleAddToCart(product.id)}
            disabled={isPending}
            classname="bg-white/90 dark:bg-[#000924]/10 border border-black/5 dark:border-white/10
            text-gray-900 dark:text-white w-full max-w-65 mx-auto"
          />
        ))}
      </div>

      {!hidePagination && (
        <div className="mt-8 flex justify-center gap-4">
          <button
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded"
          >
            Previous
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 border rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
