import { type JSX } from "react";
import { useState } from "react";
import ProductsList from "@/features/products/components/ProductsList";
import Body from "@/shared/components/layout/Body";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

function Products(): JSX.Element {
  const [sort, setSort] = useState("default");

  const getSortParams = () => {
    switch (sort) {
      case "price_asc":
        return { sortBy: "price", direction: "asc" };
      case "price_desc":
        return { sortBy: "price", direction: "desc" };
      default:
        return { sortBy: "price", direction: "asc" };
    }
  };

  return (
    <Body className="realtive mx-auto min-h-full w-full max-w-7xl px-2 py-5 sm:px-3 md:px-4 md:py-8 lg:px-4 lg:py-10">
      <div className="flex items-center justify-end gap-3 mb-4 text-right w-[97%] px-1">
        <span className="text-sm font-medium">Sort By</span>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-25 sm:w-40 lg:w-50 md:w-50 max-w-50 dark:bg-inherit bg-inherit focus:outline-0 focus:ring-0!">
            <SelectValue placeholder="Sort By" className="dark:text-white dark:font-light" />
          </SelectTrigger>

          <SelectContent className="dark:bg-darkest-blue/95 bg-amber-50/50">
            <SelectGroup>
              <SelectItem value="price_asc">Price: Ascending</SelectItem>
              <SelectItem value="price_desc">Price: Descending</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <ProductsList {...getSortParams()} />
    </Body>
  );
}

export default Products;
