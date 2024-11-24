import React from "react";

function OrderStatus({ status }) {
  return (
    <div className="bg-blend-multiply rounded-2xl px-3 py-[2px] align-middle justify-center w-fit bg-[#ECFDF3] flex flex-row gap-2">
      <span className="w-[7px] h-[7px] rounded-full bg-[#12B76A] my-auto"></span>
      <p
        className="small-title font-medium self-center"
        style={{ color: "#027A48" }}
      >
        {status?.charAt(0)?.toUpperCase() + status?.substr(1, status.length)}
      </p>
    </div>
  );
}

export default OrderStatus;
