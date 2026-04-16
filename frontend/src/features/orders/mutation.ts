import { useMutation, useQueryClient } from "@tanstack/react-query";
import {createOrder, payOrder} from "./api";
import type { OrderProp } from "./types";

export default function useCreateOrder () {
    const queryClient = useQueryClient ();
    return useMutation<OrderProp>({
        mutationFn: async () => {
            const response = await createOrder();
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["orders"]})
        }
    })
}
export function usePayOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (orderId: number) => {
            const res = await payOrder(orderId);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
    });
}
