import Image from "next/image";
import React from "react";

function Address({ data, handleDeleteAddress, handleEditAddress }) {
  return (
    <div className="border-[1px] border-[#E3E5E5] flex flex-col p-4 rounded-lg gap-2">
      <div className="flex flex-row justify-between gap-3">
        <p className="font-semibold">{data.full_name}</p>
        <div className="flex flex-row gap-3 sm:gap-6">
          <div
            className="w-[24px] h-[24px] m-auto cursor-pointer"
            onClick={() => {
              handleEditAddress(data);
            }}
          >
            <Image src={"/icons/edit.webp"} width={16} height={16} alt="edit" />
          </div>
          <div
            className="w-[24px] h-[24px] m-auto cursor-pointer"
            onClick={() => {
              handleDeleteAddress(data?._id);
            }}
          >
            <Image
              src={"/icons/delete.webp"}
              width={15}
              height={16}
              alt="delete"
            />
          </div>
        </div>
      </div>
      <p className="text-color-dark-gray ">
        {(data.house_building_no ?? "") +
          (" " + data.address ?? "") +
          (" " + data.area ?? "") +
          (" " + data.city ?? "") +
          (" " + data.pincode ?? "")}
      </p>
    </div>
  );
}

export default Address;
