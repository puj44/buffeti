import React from "react";
import OrderDatePicker from "../Common/OrderDatePicker";
import dynamic from "next/dynamic";
import OrderTimePicker from "../Common/OrderTimePicker";

function CartSummary({
  data,
  handleChangeDate,
  handleChangeTime,
  deliveryDate,
  deliveryTime,
  deliveryCharge,
}) {
  return (
    <div className="border-[1px] border-[#A8A8AD80] rounded-lg w-full flex flex-col p-4 gap-5">
      <p>{"Delivery Schedule"}</p>
      <div className="grid grid-cols-2 gap-2 md:gap-3 w-full">
        <OrderDatePicker
          handleChangeDate={handleChangeDate ?? (() => {})}
          value={deliveryDate}
        />
        <OrderTimePicker
          handleChangeTime={handleChangeTime ?? (() => {})}
          value={deliveryTime}
        />
      </div>
      <span className="border-[1px] border-dashed border-[#595959] w-full"></span>
      <p>{"Billing Details"}</p>
      <div
        className="flex flex-col gap-2 w-full"
        style={{ fontSize: "16px !important" }}
      >
        {data?.item_pricing?.length > 0 &&
          data?.item_pricing.map((itemPrice, idx) => {
            return (
              <div
                className="flex flex-row w-full gap-2 justify-between"
                key={"item-" + idx}
              >
                <p className="">
                  {itemPrice.item_name + " X " + itemPrice.qty}
                </p>
                <p className="text-nowrap">{"₹" + itemPrice.amount}</p>
              </div>
            );
          })}
        {data?.extra_charges?.length > 0 && (
          <>
            <p className="font-semibold pt-2">Extra Items</p>
            {data?.extra_charges.map((extraCharge, idx) => {
              return (
                <div
                  className="flex flex-row w-full gap-1 justify-between"
                  key={"extra-charge-" + idx}
                >
                  <p className="">
                    {extraCharge.item_name + " X " + extraCharge.qty}
                  </p>
                  <p className="text-nowrap">{"₹" + extraCharge.amount}</p>
                </div>
              );
            })}
          </>
        )}
        {Object.keys(data?.addon_charges ?? {})?.length > 0 &&
          Number(data?.addon_charges?.addOnCharges ?? 0) > 0 && (
            <div className="flex flex-row gap-1 justify-between pt-2">
              <p className="font-medium">
                {"Add On Charges X " + data.addon_charges.addOnChargesQty}
              </p>
              <p className="text-nowrap">
                {"₹" + data.addon_charges.addOnCharges}
              </p>
            </div>
          )}
        {data?.extra_services_charges?.length > 0 && (
          <>
            <p className="font-semibold pt-2">Extra Services</p>
            {data?.extra_services_charges.map((extraServiceCharge, idx) => {
              return (
                <div
                  className="flex flex-row w-full gap-1 justify-between"
                  key={"extra-service-charge-" + idx}
                >
                  <p className="">{extraServiceCharge.name}</p>
                  <p className="text-nowrap">
                    {"₹" + extraServiceCharge.price}
                  </p>
                </div>
              );
            })}
          </>
        )}
        {data?.coupon_discount_value && data?.coupon_discount_value !== 0 && (
          <div className="flex flex-row gap-1 justify-between pt-2">
            <p className="font-medium">{"Coupon"}</p>
            <p className="text-nowrap">{"- ₹" + data?.coupon_discount_value}</p>
          </div>
        )}
        <div className="flex flex-row gap-1 justify-between w-full mt-2">
          <p className="font-medium">{"Taxes"}</p>
          <p>
            {"₹" +
              Number(data?.total_billed_amount - data?.total_amount).toFixed(2)}
          </p>
        </div>
        <div className="flex flex-row gap-1 justify-between w-full mt-2">
          <p className="font-medium">{"Delivery Charge"}</p>
          {<p>{deliveryCharge > 0 ? "₹" + deliveryCharge : "FREE"}</p>}
        </div>
      </div>
      <span className="border-[1px] border-dashed  border-[#595959] w-full"></span>
      <div className="flex flex-row gap-1 justify-between w-full items-center">
        <p className="sub-title font-semibold text-color-charcoal">{"Total"}</p>
        <p className="package-title font-medium">
          {"₹" + data?.total_billed_amount}
        </p>
      </div>
    </div>
  );
}

export default CartSummary;
