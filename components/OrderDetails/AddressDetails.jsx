import Image from "next/image";
import React from "react";

function AddressDetails({ address }) {
  return (
    <div className="border-[1px] border-[#A8A8AD80] rounded-lg p-3 sm:p-4 flex flex-col gap-4 sm:gap-6 ">
      <div className="flex flex-row align-middle gap-3">
        <span className="border-[1px] w-fit h-fit my-auto border-[#EAECF0] shadow-[0px_1px_2px_0px_#1018280D] rounded-xl p-3">
          <Image
            src={"/icons/address_icon.webp"}
            width={24}
            height={24}
            alt="Address Details"
          />
        </span>
        <p className="font-semibold my-auto">Address</p>
      </div>
      <div className="flex flex-row gap-3">
        <p className="text-color-dark-gray">
          {address ? address?.toString()?.replaceAll("undefined", "") : ""}
        </p>
      </div>
    </div>
  );
}

export default AddressDetails;
