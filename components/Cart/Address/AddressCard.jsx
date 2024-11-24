import React from "react";

function AddressCard({ data, handleSelectAddress, selectedAddress }) {
  return (
    <div className="flex flex-row  gap-3">
      <span
        className={`
                w-[20px] h-[20px] rounded-full border-[1px] 
                ${
                  selectedAddress === data?._id
                    ? "border-[#B42318]"
                    : "border-[#D0D5DD] cursor-pointer"
                }
                flex justify-center items-center 
                
            `}
        onClick={() => {
          handleSelectAddress(data?._id);
        }}
      >
        {selectedAddress === data?._id && (
          <span className="rounded-full w-[8px] h-[8px] bg-primary "></span>
        )}
      </span>
      <div className="flex flex-col gap-0.5 leading-5">
        <p className="font-medium">{data?.full_name}</p>
        <p className="text-color-dark-gray">
          {data?.house_building_no +
            " " +
            data?.address +
            " " +
            (data?.area ?? "") +
            " " +
            (data?.city ?? "") +
            " " +
            (data?.pincode ?? "")}
        </p>
      </div>
    </div>
  );
}

export default AddressCard;
