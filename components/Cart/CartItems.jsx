import React, { useMemo } from "react";
import PeopleQuantityInput from "../Common/PeopleQuantityInput";
import CartItemCard from "./CartItemCard";

function CartItems({
  cartData,
  cartItemsData,
  handleChangeQuantity,
  handleChangeAdditionalQty,
  handleDeleteItem,
  handleAddItem,
}) {
  const items = useMemo(() => {
    if (cartData?.menu_option !== "mini-meals") {
      return cartItemsData?.items;
    } else {
      return cartItemsData;
    }
  }, [cartData, cartItemsData]);
  return items && Object.keys(items).length > 0 ? (
    <div className="border-[1px] border-[#A8A8AD80] rounded-lg sm:border-b-0 flex flex-col gap-6 p-4 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
        <p className="font-medium package-title">
          {cartData?.menu_option === "click2cater"
            ? "Click to Cater"
            : cartData?.menu_option === "mini-meals"
            ? "Mini Meals"
            : "Snack Box"}
        </p>
        {cartData?.menu_option !== "mini-meals" && (
          <PeopleQuantityInput
            quantity={cartItemsData?.no_of_people}
            handleChangeQuantity={handleChangeQuantity ?? (() => {})}
            isPackage={true}
          />
        )}
      </div>
      {Object.keys(items).map((ci, idx) => {
        return (
          <CartItemCard
            key={ci}
            item={items[ci]}
            noOfPeople={cartItemsData?.no_of_people}
            menuOption={cartData?.menu_option}
            handleChangeAdditionalQty={handleChangeAdditionalQty ?? (() => {})}
            handleDeleteItem={handleDeleteItem ?? (() => {})}
            handleAddItem={handleAddItem ?? (() => {})}
          />
        );
      })}
    </div>
  ) : (
    ""
  );
}

export default CartItems;
