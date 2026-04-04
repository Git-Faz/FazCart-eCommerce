import { type JSX } from "react";
import ProductsList from "@/features/products/components/ProductsList";
import Body from "@/shared/components/layout/Body";

function Products(): JSX.Element {

    return (
        <Body className="realtive mx-auto min-h-full w-full max-w-7xl px-2 py-5 sm:px-3 md:px-4 md:py-8 lg:px-4 lg:py-10">
            <ProductsList />
        </Body>
    );
}

export default Products;
