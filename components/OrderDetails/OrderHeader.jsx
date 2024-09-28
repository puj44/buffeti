import Image from "next/image";
import Link from "next/link";
import React from "react";
import PaymentStatus from "./PaymentStatus";
import OrderStatus from "./OrderStatus";

function OrderHeader({ orderStatus, paymentStatus }) {
  return (
    <div className="py-5 flex flex-row align-middle gap-4 px-6">
      <Link href={"/account"} className="my-auto">
        <Image src={"/icons/back.webp"} width={16} height={12} alt="Back" />
      </Link>
      <span className="border-[1px] border-[#EAECF0] shadow-[0px_1px_2px_0px_#1018280D] rounded-xl p-3">
        <Image
          src={"/icons/order_details.webp"}
          width={16}
          height={20}
          alt="Order Details"
        />
      </span>
      <div className="flex flex-row gap-3 align-middle my-auto">
        <p className="font-semibold description">{"Order Details"}</p>
        {(paymentStatus === "partially_paid" ||
          paymentStatus === "fully_paid") && (
          <PaymentStatus
            paymentStatus={
              paymentStatus === "partially_paid" ? "Partially Paid" : "Paid"
            }
          />
        )}
        {orderStatus && <OrderStatus status={orderStatus} />}
      </div>
    </div>
  );
}

export default OrderHeader;
