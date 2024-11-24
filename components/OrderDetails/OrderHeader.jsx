import Image from "next/image";
import Link from "next/link";
import React from "react";
import PaymentStatus from "./PaymentStatus";
import OrderStatus from "./OrderStatus";

function OrderHeader({ orderStatus, paymentStatus }) {
  return (
    <div className="py-3 sm:py-5 flex flex-row align-middle gap-4 sm:gap-6 px-0 sm:px-6 border-b-[#EAECF0] border-b-[1px]">
      <Link href={"/account"} className="my-auto">
        <Image
          src={"/icons/back.webp"}
          style={{
            width: "100%",
            height: "100%",
          }}
          width={16}
          height={12}
          alt="Back"
        />
      </Link>
      <span className="border-[1px] w-fit h-fit my-auto border-[#EAECF0] shadow-[0px_1px_2px_0px_#1018280D] rounded-xl p-3">
        <Image
          src={"/icons/order_details.webp"}
          width={16}
          height={20}
          style={{
            width: "100%",
            height: "100%",
          }}
          alt="Order Details"
        />
      </span>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 align-middle my-auto">
        <p className="font-semibold description">{"Order Details"}</p>
        {(paymentStatus === "partially_paid" ||
          paymentStatus === "fully_paid") && (
          <PaymentStatus
            paymentStatus={
              paymentStatus === "partially_paid" ? "Partially Paid" : "Paid"
            }
          />
        )}
        <div className="hidden sm:block my-auto">
          {orderStatus && <OrderStatus status={orderStatus} />}
        </div>
      </div>
    </div>
  );
}

export default OrderHeader;
