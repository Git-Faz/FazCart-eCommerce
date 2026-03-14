import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/shared/components/ui/item";
import type { JSX } from "react";
import { type OrderProp } from "../types";


const OrderCard = ({ id, items, totalAmount, status }: OrderProp): JSX.Element => {
  return (
    <Item variant={"default"} 
    className="mx-0 mt-4 w-full max-w-full dark:bg-gray-800 dark:text-white shadow-md shadow-blue-200 dark:shadow-none sm:mt-6 sm:mx-2">
      <ItemContent className="text-black dark:text-white">
        <ItemTitle className="w-full text-xl sm:text-2xl">Order #{id}</ItemTitle>
        <ItemDescription className="flex flex-col dark:text-white">
          
            <span className="text-xl"> Items: </span>

              {items.map(item =>

                  <li key={item.id} className="dark:text-neutral-200 ">
                    <span className="text-[17px]"><strong>{item.productName}</strong> × {item.quantity}</span> <br />
                  </li>

              )}


            <span>Total: ₹{totalAmount}</span>
            <span> Status: {status}</span>
        
        </ItemDescription>
      </ItemContent>
      <ItemActions className="align-top flex w-full flex-wrap gap-2 text-sm sm:w-auto sm:flex-col">
        <button className="max-w-full min-w-28 rounded-md bg-blue-200 p-2 text-[14px] hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-200 dark:hover:text-black">Exchange / Refund</button>
        <button className="max-w-full min-w-28 rounded-md bg-blue-200 p-2 text-[14px] hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-200 dark:hover:text-black">View Details</button>
      </ItemActions>
    </Item>
  )
}

export default OrderCard