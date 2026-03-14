import { getCart } from "@/features/cart/api";
import { createOrder } from "@/features/orders/api";
import { useEffect, useMemo, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { type AxiosResponse, AxiosError } from "axios";
import CartItemCard from "@/features/cart/components/CartItemCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import Loading from "@/shared/components/ui/myUI/Loading";
import Body from "@/shared/components/layout/Body";

interface OrderItem {
    productId: number;
    productName: string;
    productPrice: number;
    productImageUrl: string;
    quantity: number;
    totalPrice: number;
}

const Checkout = (): JSX.Element => {

    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const navigate = useNavigate();
    const [loading,setLoading] = useState<Boolean>(true);

    useEffect(() => {
        getCart()
            .then((res: AxiosResponse<OrderItem[]>) => {
                setOrderItems(res.data);
                setLoading(false);
                console.log(res.data);
            })
            .catch((e: AxiosError) => {
                console.error("Failed to fetch cart", e);
            });
    }, []);

    const total = useMemo(
        () => orderItems.reduce((sum, item) => sum + item.totalPrice, 0),
        [orderItems]
    );


    if(loading) return <Loading/>


    const handleSubmission = async () => {
        try {
            await createOrder();
            alert("Order placed successfully");
            navigate("/orders");
        } catch (err) {
            console.error("Order creation failed", err);
            alert("Failed to place order");
        }
    };
    console.log(total);

    const deliveryFee = orderItems.length > 0 ? 49 : 0;

    return (
        <Body>
        <div className="m-3 p-3 sm:m-5 sm:p-5">
            <h1 id="title" className="mb-4">Checkout</h1>

            <div className="grid w-full items-start gap-4 sm:gap-6 md:grid-cols-2 md:gap-x-8 lg:gap-x-12">
                <div className="my-auto flex max-h-[60vh] min-h-fit flex-col gap-y-4 overflow-y-auto rounded-lg p-3 shadow-md shadow-blue-300 sm:p-4 md:max-h-[75vh]">
                    {orderItems.map((item: OrderItem, i) => (
                        <CartItemCard
                            key={i}
                            serialNo={i+1}
                            name={item.productName}
                            imageUrl={item.productImageUrl}
                            price={item.productPrice}
                            quantity={item.quantity}
                            total={item.totalPrice}
                            classname="w-full mt-0 mb-2 mx-auto shadow-2xs shadow-accent h-fit"

                        />
                    ))}
                </div>

                <Card className="h-fit bg-inherit shadow-md shadow-blue-300">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="space-y-1 text-sm">
                            {orderItems.map((item: OrderItem, i) => (
                                <div key={i} className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        {item.productName} <span className="text-xs">(x{item.quantity})</span>
                                    </span>
                                    <span>₹{item.totalPrice.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Delivery fee</span>
                            <span>₹{deliveryFee.toFixed(2)}</span>
                        </div>

                        <div className="h-px bg-border" />

                        <div className="flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>₹{(total + deliveryFee).toFixed(2)}</span>
                        </div>

                        <div className="pt-4 space-y-2">
                            <h2 className="text-lg font-semibold">Choose a payment method</h2>
                            <div className="flex flex-col gap-2">
                                <Button
                                    onClick={handleSubmission}
                                    className="bg-green-300 text-black hover:bg-green-400"
                                >
                                    Pay from fazWallet
                                </Button>
                                <Button
                                    onClick={handleSubmission}
                                    className="bg-blue-300 text-black hover:bg-blue-400"
                                >
                                    NetBanking
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </Body>
    )
}

export default Checkout;