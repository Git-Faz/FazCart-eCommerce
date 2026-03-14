import { type JSX } from "react";
import type { ProductInfoProps, QuantityCounterProps } from "../types";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/shared/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select"
import { Button } from "../../../shared/components/ui/button";


const QuantityCounter = ({ max, value, onChange, }: QuantityCounterProps): JSX.Element => (
    <Select
        value={value.toString()}
        onValueChange={(v) => onChange(Number(v))}
    >
        <SelectTrigger className="w-20">
            <SelectValue />
        </SelectTrigger>

        <SelectContent>
            {Array.from({ length: max }, (_, i) => i + 1).map((qty) => (
                <SelectItem key={qty} value={qty.toString()}>
                    {qty}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

const ProductInfo = ({
    name,
    description,
    categories,
    price,
    imageUrl,
    quantity,
    onQuantityChange,
    onButtonClick,
}: ProductInfoProps): JSX.Element => {

    return (
        <Card id="productInfoCard" className="flex w-full flex-col items-start dark:border-none dark:bg-gray-900 border-amber-200 justify-start p-4 sm:p-6 lg:flex-row lg:items-start lg:p-8">
            <div className="flex w-full justify-start lg:w-[45%]">
                <img src={imageUrl} alt="product image" className="h-auto max-h-105 w-full rounded-md object-contain sm:max-h-130 lg:max-h-175" />
            </div>

            <CardContent className="h-full w-full space-y-4 px-0 pt-4 sm:space-y-6 lg:w-[55%] lg:px-6 lg:pt-0">
                <CardTitle className="text-2xl sm:text-4xl lg:text-5xl">{name}</CardTitle>
                <div><span className="text-2xl sm:text-3xl lg:text-4xl">₹{price}</span></div>

                <div>
                    <h4 className="text-xl sm:text-2xl lg:text-3xl">Description:</h4>
                    <p className="text-base sm:text-lg lg:text-xl">{description}</p>
                </div>

                <div>
                    <h4 className="text-lg sm:text-xl">Categories:</h4><span className="text-sm sm:text-base">{categories.join(", ")}</span>
                </div>

                <div className="flex w-full flex-wrap items-center justify-start gap-2">
                    <span className="p-1 text-base sm:text-lg lg:text-xl">Quantity:</span>
                    <QuantityCounter
                        max={5}
                        value={quantity}
                        onChange={onQuantityChange}

                    />
                    <Button onClick={onButtonClick} className="min-w-fit bg-blue-500 px-3 font-semibold hover:bg-blue-700 sm:px-4">
                        Add to Cart
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
};

export default ProductInfo;