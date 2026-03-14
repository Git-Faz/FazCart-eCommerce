import type { JSX } from "react";
import type { OrderProp } from "@/features/orders/types";
import { useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
import useOrders from "@/features/orders/queries";
import OrderCard from "@/features/orders/components/OrderCard";
import Loading from "@/shared/components/ui/myUI/Loading";
import Body from "@/shared/components/layout/Body";
import { Button } from "@/shared/components/ui/button";
import Error from "@/shared/components/ui/myUI/Error";
import Empty from "@/shared/components/ui/myUI/Empty";

const Order = (): JSX.Element => {
    const { isLoggedIn } = useAuth();
    const [page, setPage] = useState(0);

    const { data: orders, isLoading, isFetching, isError } = useOrders(page);

    const totalPages = orders?.totalPages ?? 0

    if (!isLoggedIn) return <Error errorTitle="LOGIN" errorMsg="To view your ORDERS ..."></Error>

    if (isLoading || isFetching) return <Loading message="Loading your Orders..." />;

    if (isError) {
        return (
            <Error errorMsg="Could not load orders... Please try again later"/>
        )
    }

    if (orders?.content.length === 0) return <Empty message="No orders yet... Place your first Order"/>;


    return (
        <Body>
            <div className="m-3 flex h-full w-full flex-col space-y-8 p-2 sm:m-5 sm:p-3 sm:space-y-10">
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
                <div className="m-2 flex flex-wrap items-center justify-start gap-3 p-1 sm:m-5 sm:p-3">
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