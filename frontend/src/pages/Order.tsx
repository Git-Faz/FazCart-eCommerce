import type { JSX } from "react";
import type { OrderProp } from "@/features/orders/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";
import useOrders from "@/features/orders/queries";
import OrderCard from "@/features/orders/components/OrderCard";
import Loading from "@/shared/components/ui/myUI/Loading";
import Body from "@/shared/components/layout/Body";
import { Button } from "@/shared/components/ui/button";
import Error from "@/shared/components/ui/myUI/Error";

const Order = (): JSX.Element => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [page, setPage] = useState(0);

    const { data: orders, isLoading, isFetching, isError } = useOrders(page);

    const totalPages = orders?.totalPages ?? 0

    if (!isLoggedIn) return (<><h1>Please login to view you Orders </h1></>)

    if (isLoading || isFetching) return <Loading message="Loading your Orders..." />;

    if (isError) {
        return (
            <Error errorMsg="Could not load orders... Please try again later"/>
        )
    }

    if (orders?.content.length === 0) return <h3 className="text-xl font-bold">No orders</h3>;


    return (
        <Body>
            <div className="m-5 p-3 flex flex-col h-full space-y-10 w-full">
                <h1 id="title">Your Orders</h1>
                <div className="flex flex-col">
                    {orders?.content.map((order: OrderProp, index: number) => (
                        <OrderCard
                            key={index}
                            id={order.id}
                            items={order.items}
                            totalAmount={order.totalAmount}
                            status={order.status}
                        />
                    ))}
                </div>
                <div className="flex flex-row justify-start space-x-5 m-5 p-3">
                    <Button
                        type={"button"} variant={"outline"}
                        onClick={() => setPage((prev) => prev - 1)}
                        disabled={page === 0}
                    >
                    Previous
                    </Button>
                    <span>
                        Page {page + 1} of {totalPages}
                    </span>
                    <Button
                        disabled={page + 1 >= totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                    Next
                    </Button>
                </div>
            </div>
        </Body>
    );
}

export default Order;