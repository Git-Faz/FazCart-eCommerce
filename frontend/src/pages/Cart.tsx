import { type JSX } from "react";
import { useNavigate } from "react-router-dom";
import CartItemCard from "@/features/cart/components/CartItemCard";
import { Button } from "@/shared/components/ui/button";
import Loading from "@/shared/components/ui/Loading";
import { useAuth } from "@/features/auth/useAuth";
import useCart from "@/features/cart/queries";
import { useDeleteCartItem, useClearCart } from "@/features/cart/mutation"
import Body from "@/shared/components/layout/Body";
import { toast } from "sonner";


const Cart = (): JSX.Element => {

    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const { data: cart, isLoading: cartIsLoading, isError } = useCart();
    const { mutate: deleteItem, isPending: isDeleting } = useDeleteCartItem();
    const { mutate: clearCart, isPending: isClearing } = useClearCart();

    console.log(cart);
console.log(cart?.[0]);
console.log(cart?.[0]?.productId);
    

    if (!isLoggedIn) {
        return (
            <>
                <h1>Please log in to view cart</h1>
            </>
        )
    }

    if (cartIsLoading) return <Loading message="Loading Cart..." />

    if (isError) return <h1>Failed to load cart</h1>

    if (!cart?.length) {
        return (
            <div>
                <h1 id="title">Cart Page</h1>
                <h3>Your cart is empty</h3>
            </div>
        );
    }

    const handleCheckout = () => navigate('/checkout')

    return (
        <Body classname="mx-20 p-5 min-w-fit w-full max-w-3xl">
                <h1 id="title" >My Cart</h1>
                <div>
                    {
                        cart.map((item: any) => { 
                            console.log(item);
                            return (
                            <CartItemCard
                                key={item.id}
                                name={item.productName}
                                imageUrl={item.productImageUrl}
                                price={item.productPrice}
                                quantity={item.quantity}
                                total={item.totalPrice}
                                onClick={() => navigate(`/products/${item.productId}`)}
                                onDelete={() => {
                                    deleteItem(item.id)
                                    toast.success(`Removed item: ${item.productName}`)
                                }}
                                disabled={isDeleting}
                                classname="min-w-fit w-3xl shadow-blue-300 shadow-md dark:shadow-none disabled:cursor-not-allowed "
                            />
                            
                        )})
                    }
                </div>
                <div className="flex justify-end gap-x-5 mx-auto min-w-fit w-3xl max-w-3xl">

                    <Button variant={"destructive"} size={"sm"} onClick={() => clearCart()} 
                     disabled={isClearing}
                     className="bg-red-300 text-black hover:bg-red-500" 
                    >Clear</Button>

                    <Button size={"sm"} onClick={handleCheckout} className="bg-green-300 text-black hover:bg-green-400"
                    >Proceed to buy</Button>
                </div>
        </Body>
    )
}

export default Cart;