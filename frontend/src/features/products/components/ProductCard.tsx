import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"
import type { JSX } from "react";
import type { ProductCardProps } from "../types";
import { ShoppingCartIcon as Cart } from "lucide-react";
import { cn } from "@/shared/utils/utils";


const ProductCard = ({ img, name, price, onClick, onBtnClick, disabled, classname }: ProductCardProps): JSX.Element => {
    return (
        <Card
            id="productCard"
            className={cn(
            "relative flex flex-col pb-5 pt-0 w-full min-w-0 h-full gap-3 rounded-lg cursor-pointer backdrop-blur-md transition-shadow duration-200 ease-out sm:min-h-92 shadow-blue-300 dark:shadow-sm dark:shadow-blue-400 bg-white/90 dark:bg-gray-800/90 border border-black/5 dark:border-white/10 text-gray-900 dark:text-white",classname
            )}>   
            <div onClick={onClick}>
                <img src={img.link} alt={img.alt} loading="lazy" className="m-0 h-48 w-full gap-0 rounded-t-lg border-b border-purple-200 object-cover p-0 sm:h-54"></img>
            </div>
            <CardHeader className="gap-0 px-3 py-2 text-center" onClick={onClick}>
                <CardTitle>{name}</CardTitle>
            </CardHeader>

            <CardContent className="gap-0 text-center p-b" >
                <p>₹{price}</p>
            </CardContent>
            <CardAction className="self-center">
                <button
                    onClick={onBtnClick}
                    disabled={disabled}
                    className="mx-auto my-1 flex min-w-fit w-auto justify-between gap-2 rounded-md bg-purple-300 px-3 py-2 text-center text-sm text-neutral-800
                    hover:text-white transition-all duration-200 ease-in hover:bg-purple-500 focus:bg-purple-500
                     disabled:cursor-not-allowed disabled:bg-gray-400
                    ">
                    Add to cart <Cart size={"20px"} />
                </button>
            </CardAction>
        </Card>
    )
}

export default ProductCard;