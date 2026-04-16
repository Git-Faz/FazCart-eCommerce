import {type JSX} from "react";
import {useNavigate} from "react-router-dom";
import CartItemCard from "@/features/cart/components/CartItemCard";
import {Button} from "@/shared/components/ui/button";
import Loading from "@/shared/components/ui/myUI/Loading";
import {useAuth} from "@/features/auth/useAuth";
import useCart from "@/features/cart/queries";
import {useDeleteCartItem, useClearCart} from "@/features/cart/mutation"
import Body from "@/shared/components/layout/Body";
import {toast} from "sonner";
import Error from "@/shared/components/ui/myUI/Error";
import Empty from "@/shared/components/ui/myUI/Empty";


const Cart = (): JSX.Element => {

    const navigate = useNavigate();
    const {isLoggedIn} = useAuth();

    const {data: cart, isLoading: cartIsLoading, isError} = useCart();
    const {mutate: deleteItem, isPending: isDeleting} = useDeleteCartItem();
    const {mutate: clearCart, isPending: isClearing} = useClearCart();

    if (!isLoggedIn) {
        return (
            <Error errorTitle="LOGIN" errorMsg="To view your CART ..."></Error>
        )
    }

    if (cartIsLoading) return <Loading message="Loading Cart..."/>

    if (isError) return <Error errorMsg="Could not load cart...Please try again later"/>

    if (!cart?.length) {
        return (
            <div className="h-dvh w-full">
                <h1 id="title" className="p-10 text-4xl">My Cart</h1>
                <Empty message="No items in cart ..."></Empty>
            </div>
        );
    }

    const handleCheckout = () => navigate('/checkout')

    return (
        <Body className="mx-auto w-full max-w-4xl px-4 py-5 sm:px-6">
            <h1 id="title">My Cart</h1>
            <div>
                {
                    cart.map((item: any) => {
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
                                classname="mx-0 w-full shadow-md shadow-blue-300 dark:shadow-none disabled:cursor-not-allowed"
                            />

                        )
                    })
                }
            </div>
            <div className="mx-auto flex w-full flex-wrap items-center justify-end gap-3">

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