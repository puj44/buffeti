import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import OrderStatusCard from "./OrderStatusCard";
import PaymentStatus from "../OrderDetails/PaymentStatus";
import OrderStatus from "../OrderDetails/OrderStatus";

function OrderListingCard({ data, handleShowPayment }) {
  const handlePayClick = (orderNumber) => {
    handleShowPayment(orderNumber);
  };
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="w-full items-center mb-2 flex flex-row  gap-3">
        <p className="sub-title font-semibold">{data.order_number}</p>
        {data.payment_status === "pending" && (
          <OrderStatus status="Payment Pending" />
        )}
        {(data.payment_status === "partially_paid" ||
          data.payment_status === "fully_paid") && (
          <PaymentStatus
            paymentStatus={
              data.payment_status === "partially_paid"
                ? "Partially Paid"
                : "Paid"
            }
          />
        )}
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <p className="text-color-dark-gray description max-w-[500px]">
          {data.item_pricing?.length > 0 &&
            data.item_pricing.map((item, index) => {
              return `${index > 0 ? ", " : ""}${item.item_name}`;
            })}
        </p>
        {/* {(data.payment_status === "pending" ||
          data.payment_status === "partially_paid") && (
          <button
            className="btn primary-btn w-fit h-fit sm:self-end"
            onClick={() => {
              handlePayClick({
                order_number: data.order_number,
                total_billed_amount: data.total_billed_amount,
                amount_due: data.amount_due,
                payment_status: data.payment_status,
              });
            }}
          >
            {`Pay${
              data.payment_status === "pending"
                ? " Now"
                : " ₹" + data.amount_due
            }`}
          </button>
        )} */}
      </div>
      <Link
        href={"/orders/" + data.order_number}
        className="flex flex-col sm:flex-row w-full "
      >
        <p className="text-color-dark-gray description w-full">
          {moment(data.createdAt).format("DD MMM YYYY")}
        </p>
        <div className="flex flex-col gap-4 mt-2 sm:mt-0">
          <span className="flex flex-row items-center gap-2 ">
            <p className="font-bold description">{`₹${data.total_billed_amount}`}</p>
            <Image
              src={"/arrows/red_r_arrow.webp"}
              width={7}
              height={14}
              alt="arrow"
            />
          </span>
        </div>
      </Link>
      {data.order_status !== "delivered" && (
        <OrderStatusCard orderStatus={data.order_status} />
      )}
    </div>
  );
}

export default OrderListingCard;
