import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import OrderStatusCard from "./OrderStatusCard";

function OrderListingCard({ data }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full items-center flex flex-row justify-between">
        <p className="sub-title font-semibold">{data.order_number}</p>
        {data.payment_status === "pending" ||
        data.payment_status === "partially_paid" ? (
          <button className="btn primary-btn">
            {`Pay${
              data.payment_status === "pending"
                ? " Now"
                : " ₹" + data.total_billed_amount
            }`}
          </button>
        ) : (
          <p className="description">{"Paid"}</p>
        )}
      </div>
      <p className="text-color-dark-gray description max-w-[500px]">
        {data.item_pricing?.length > 0 &&
          data.item_pricing.map((item, index) => {
            return `${index > 0 ? ", " : ""}${item.item_name}`;
          })}
      </p>
      <Link
        href={"/orders/" + data.order_number}
        className="flex flex-col sm:flex-row w-full"
      >
        <p className="text-color-dark-gray description w-full">
          {moment(data.createdAt).format("DD MMM YYYY")}
        </p>
        <span className="flex flex-row items-center gap-2 ">
          <p className="font-bold description">{`₹${data.total_billed_amount}`}</p>
          <Image
            src={"/arrows/red_r_arrow.webp"}
            width={7}
            height={14}
            alt="arrow"
          />
        </span>
      </Link>
      {data.order_status !== "delivered" && (
        <OrderStatusCard orderStatus={data.order_status} />
      )}
    </div>
  );
}

export default OrderListingCard;
