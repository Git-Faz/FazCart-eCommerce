import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {usePayOrder} from "@/features/orders/mutation.ts";
import Body from "@/shared/components/layout/Body";

export default function Payment() {
    const {orderId} = useParams();
    const navigate = useNavigate();

    const {mutate} = usePayOrder();

    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

    useEffect(() => {
        if (!orderId) return;

        mutate(Number(orderId), {
            onSuccess: () => {
                setStatus("success");
                setTimeout(() => navigate("/orders"), 1500);
            },
            onError: () => {
                setStatus("failed");
            }
        });

    }, [orderId]);

    return (
        <Body>
            <div
                className="mx-auto flex min-h-[80vh] w-full max-w-4xl flex-col items-center justify-center p-6 font-[retrofloral] tracking-widest">

                <h1 id="title">Processing Payment</h1>

                <div className="glassyContainer mt-8 w-full max-w-xl p-8 flex flex-col items-center gap-6 text-center">

                    {/* 🔄 Loading */}
                    {status === "loading" && (
                        <>
                            <div
                                className="h-16 w-16 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
                            <p className="text-lg text-neutral-300">
                                Processing your payment...
                            </p>
                        </>
                    )}

                    {/* ✅ Success */}
                    {status === "success" && (
                        <>
                            <div className="text-5xl text-green-400">✔</div>
                            <p className="text-xl text-green-300">
                                Payment Successful
                            </p>
                            <p className="text-sm text-neutral-400">
                                Redirecting to your orders...
                            </p>
                        </>
                    )}
                    
                    {status === "failed" && (
                        <>
                            <div className="text-5xl text-red-400">✖</div>
                            <p className="text-xl text-red-300">
                                Payment Failed
                            </p>

                            <div className="flex gap-4 mt-4">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="rounded-md bg-blue-300 px-4 py-2 text-black hover:bg-blue-400"
                                >
                                    Retry
                                </button>

                                <button
                                    onClick={() => navigate("/orders")}
                                    className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                                >
                                    Go to Orders
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </Body>
    );
}