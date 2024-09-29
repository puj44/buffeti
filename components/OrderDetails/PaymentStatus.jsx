import Image from "next/image";
import React from "react";

function PaymentStatus({ paymentStatus }) {
  return (
    <span className="flex flex-row gap-1 px-3 py-0.5 align-middle justify-center border-[1.5px] border-[#027A48] rounded-2xl">
      <div className="my-auto">
        <Image src={"/icons/check.webp"} width={16} height={16} alt="Tick" />
      </div>
      <p className="font-medium" style={{ color: "#027A48" }}>
        {paymentStatus}
      </p>
    </span>
  );
}

export default PaymentStatus;
