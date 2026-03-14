import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/shared/components/ui/item"
import type { JSX } from "react"
import type { CartItem } from "../types";
import { TrashIcon } from "lucide-react";
import { cn } from "@/shared/utils/utils";

const CartItemCard = ({name, price, quantity, imageUrl, total, onClick ,onDelete, classname, serialNo, disabled }: CartItem): JSX.Element => {
    return (
        <Item className={cn(
        "m-0 h-fit w-full min-w-0 items-start justify-center gap-3 rounded-md bg-amber-50 p-3 align-middle dark:bg-gray-900 sm:p-4",
        classname
      )} >{serialNo}
            <ItemMedia variant="image" className="flex size-20 cursor-pointer self-center sm:size-24" onClick={onClick} id="itemMedia">
                <img src={imageUrl} alt="product image" loading="lazy" className="m-0 self-center" />
            </ItemMedia>
            <ItemContent>
                <ItemTitle className="w-full cursor-pointer text-lg sm:text-2xl">{name}</ItemTitle>
                <ItemDescription className="flex flex-col text-accent-foreground dark:text-white">
                        <span className="text-lg sm:text-xl">₹{price}</span>
                        <span className="text-md">Quantity: {quantity}</span>
                        <span className="text-md">Total: ₹{total}</span>
                </ItemDescription>
            </ItemContent>
            {onDelete && (
                <ItemActions>
                    <button onClick={onDelete} disabled={disabled}>
                        <TrashIcon/>
                    </button>
                </ItemActions>
            )}
        </Item>
    )
}

export default CartItemCard;