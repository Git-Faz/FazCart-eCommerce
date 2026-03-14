import { useEffect, useState, type JSX } from "react";
import type { Product } from "@/features/products/types";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";
import { getProductById } from "@/features/products/api";
import { addToCart } from "@/features/cart/api";
import { toast } from "sonner";
import ProductInfo from "@/features/products/components/ProductInfo";
import Loading from "@/shared/components/ui/myUI/Loading";
import Body from "@/shared/components/layout/Body";


const ProductDetails = (): JSX.Element => {
    const { id } = useParams();
    const {isLoggedIn} = useAuth();
    const [productDetails, setProductDetails] = useState<Product | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [loading,setLoading] = useState<Boolean>(true);

    const productId = Number(id);

    useEffect(() => {
        if (!id) return;

        getProductById(productId)
            .then(res => {
                setProductDetails(res.data)
                setLoading(false);
            })
            .catch(e => console.error(e));
    }, [productId]);

    function addCart(prodId: number, qty: number) {
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

        addToCart(prodId, qty);
        toast.success("Item added to cart!");
    }
    
    if(loading) return <Loading/>

    if (!productDetails) {
        return <h1>Product doesn’t exist</h1>;
    }

    return (
        <Body classname="mx-10">
        <div className="flex p-10">
            <ProductInfo
                name={productDetails.name}
                description={productDetails.description}
                price={productDetails.price}
                imageUrl={productDetails.imageUrl}
                categories={productDetails.categories}
                stock={25}
                quantity={selectedQuantity}
                onQuantityChange={setSelectedQuantity}
                onButtonClick={() =>
                    addCart(productDetails.id, selectedQuantity)
                }
            />
        </div>
        </Body>
    );
};



export default ProductDetails;