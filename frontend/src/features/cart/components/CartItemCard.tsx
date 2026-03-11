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
        "m-5 w-full min-w-0 h-fit align-middle justify-center dark:bg-gray-900 bg-amber-50",
        classname
      )} >{serialNo}
            <ItemMedia variant="image" className="flex size-24 sm:size-10 self-center cursor-pointer" onClick={onClick} id="itemMedia">
                <img src={imageUrl} alt="product image" loading="lazy" className="m-0 self-center" />
            </ItemMedia>
            <ItemContent>
                <ItemTitle className="text-2xl cursor-pointer">{name}</ItemTitle>
                <ItemDescription className="flex flex-col text-accent-foreground dark:text-white">
                        <span className="text-xl">₹{price}</span>
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