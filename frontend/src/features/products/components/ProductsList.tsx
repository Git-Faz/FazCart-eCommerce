import { type JSX, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "@/features/products/components/ProductCard"
import placeholder from "@/assets/placeholder.jpg";
import { useAddToCart } from "@/features/cart/mutation";
import { toast } from "sonner";
import Loading from "@/shared/components/ui/myUI/Loading";
import Error from "@/shared/components/ui/myUI/Error";
import { useAuth } from "@/features/auth/useAuth";
import { useProducts } from "../queries";

export default function ProductsList(): JSX.Element {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("name")?.trim()?.toLowerCase() ?? "";
    console.log("Query: ", query);
    
    const [page, setPage] = useState(0);

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const { data, isLoading, isFetching, isError } = useProducts(query, page);
    const { mutate: addToCart, isPending } = useAddToCart();

    const products = data?.content ?? [];
    const totalPages = data?.totalPages ?? 0;

    useEffect(() => {
        setPage(0);
    }, [query]);

    function handleAddToCart(prodId: number, qty = 1) {
        if (!isLoggedIn) {
            toast.info(
                <>
                    <Link to="/auth" className="underline">
                        Login
                    </Link>{" "}
                    to add items to cart
                </>
            );
            return;
        }
        addToCart({ productId: prodId, quantity: qty },
            {
                onSuccess: () => { toast.success("Item added to cart!") },
                onError: () => { toast.error("Failed to add item to cart") },
            }
        );
    }

    if (isLoading || isFetching) return <Loading message="Loading Products..." />

    if (isError) {
        return (
            <Error errorMsg="Could not load products..." />
        )
    }

    return (
        <>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
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
                    />
                ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
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
        </>
    )
}