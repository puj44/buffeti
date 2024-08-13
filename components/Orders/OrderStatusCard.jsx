import Image from "next/image";
import React, { useEffect, useMemo } from "react";
const statusEnum = {
  placed: { value: "Order Placed", statusIndex: 0 },
  confirmed: { value: "Order Confirmed", statusIndex: 1 },
  preparing: { value: "Order Preparing", statusIndex: 2 },
  out_for_delivery: { value: "Out for Delivery", statusIndex: 3 },
  delivered: { value: "Delivered", statusIndex: 4 },
};
function OrderStatusCard({ orderStatus }) {
  const currentCheckedStatus = useMemo(() => {
    return statusEnum[orderStatus].statusIndex;
  }, [orderStatus]);
  return (
    <div className="relative">
      <div className="flex flex-col order-status-line md:flex-row gap-6 md:gap-4 md:justify-between w-full">
        {Object.keys(statusEnum).map((currentStatus, rowIdx) => {
          const isPrevChecked = rowIdx < currentCheckedStatus;
          const isChecked = currentStatus === orderStatus;
          return (
            <>
              <div
                className="grid grid-flow-col justify-start md:grid-flow-row gap-4 md:justify-center"
                id={`status-${currentStatus}`}
              >
                <span
                  className={`order_status md:mx-auto relative ${
                    isPrevChecked
                      ? "order_prev_checked"
                      : isChecked
                      ? "order_current_checked"
                      : ""
                  }`}
                >
                  <span
                    className={`${
                      isPrevChecked ? "hidden" : "inner_white_circle"
                    } `}
                  ></span>
                  <Image
                    src={"/icons/white_tick.webp"}
                    width={16}
                    height={14}
                    alt="tick"
                    className={`${!isPrevChecked ? "hidden" : ""}`}
                  />
                </span>
                <p
                  className={`font-semibold my-auto ${
                    isChecked ? "text-color-primary" : ""
                  }`}
                >
                  {statusEnum[currentStatus].value}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default OrderStatusCard;
