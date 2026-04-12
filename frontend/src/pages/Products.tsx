import { type JSX } from "react";
import { useState } from "react";
import ProductsList from "@/features/products/components/ProductsList";
import Body from "@/shared/components/layout/Body";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

function Products(): JSX.Element {
  const [sort, setSort] = useState("default");
  const [tempMin, setTempMin] = useState<number | undefined>();
  const [tempMax, setTempMax] = useState<number | undefined>();

  const [appliedMin, setAppliedMin] = useState<number | undefined>();
  const [appliedMax, setAppliedMax] = useState<number | undefined>();

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
    <Body className="realtive mx-auto min-h-full w-full max-w-7xl px-2 py-5 sm:px-3 md:px-4 md:py-8 lg:px-4 lg:py-8">
      {/* FILTER + SORT BAR */}
      <div className=" flex flex-wrap items-center gap-3 mb-5 justify-start md:justify-between lg:justify-end
        w-[93%] px-2 md:mx-auto lg:px-0 "
      >
        {/* FILTER */}
        <div className=" flex items-center gap-3 w-full sm:w-auto pb-2 border-b border-white/10 md:border-none
          md:pb-0 lg:border-r lg:pr-6 "
        >
          <span className="text-sm font-medium whitespace-nowrap">
            Filter Price
          </span>

          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              onChange={(e) =>
                setTempMin(e.target.value ? Number(e.target.value) : undefined)
              }
              className=" w-16 sm:w-20 md:w-24 dark:bg-darkest-blue/70 bg-amber-100/70 p-1.5 rounded-md text-sm focus:outline-none "
            />

            <input
              type="number"
              placeholder="Max"
              onChange={(e) =>
                setTempMax(e.target.value ? Number(e.target.value) : undefined)
              }
              className="w-16 sm:w-20 md:w-24 dark:bg-darkest-blue/70 bg-amber-100/70 p-1.5 rounded-md text-sm focus:outline-none"
            />

            <button
              onClick={() => {
                setAppliedMin(tempMin);
                setAppliedMax(tempMax);
              }}
              className=" text-sm px-3 py-1.5 border border-white/20 rounded-md hover:bg-blue-950/60 transition"
            >
              Apply
            </button>
          </div>
        </div>

        {/* SORT */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium whitespace-nowrap">Sort By</span>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className=" w-36 sm:w-40 md:w-44 dark:bg-darkest-blue/70 bg-amber-100/70 border 
              dark:border-white/10 focus:ring-0 active:border-none!">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>

            <SelectContent className="dark:bg-darkest-blue/95 bg-amber-100/70">
              <SelectGroup>
                <SelectItem value="price_asc">Price: Ascending</SelectItem>
                <SelectItem value="price_desc">Price: Descending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ProductsList
        {...getSortParams()}
        minPrice={appliedMin}
        maxPrice={appliedMax}
      />
    </Body>
  );
}

export default Products;
