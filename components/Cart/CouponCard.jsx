import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function CouponCard({
  handleApplyCoupon, 
  couponError,
  couponDiscount,
  couponType,
  couponCode,
  handleRemoveCoupon
}) {
const [value, setValue] = useState();
  return (
    <div className='border-[1px] border-[#A8A8AD80] rounded-lg   flex flex-col p-4 gap-2 w-full'>
        <p>{"Apply Coupon"}</p>
        {
          couponDiscount ?
          <div className={`input-container items-center justify-between relative `} style={{borderColor:"#2EB418", padding:"14px 8px 14px 8px"}}>
            <div className='flex flex-row gap-2 items-center'>
              <span className='flex justify-center items-center w-[28px] h-[28px] border-[1.5px] border-[#039855] bg-[#ECFDF3] rounded-2xl'>
                <Image
                  src={"/icons/check.webp"}
                  width={12}
                  height={12}
                  alt=""
                  priority
                />
              </span>
              <label className='text-color-dark-gray'>{couponCode}</label>
            </div>
            <span className='px-3 text-[#FF3B30] cursor-pointer' onClick={()=>{handleRemoveCoupon()}}>
              {"Remove"}
            </span>
          </div>

          :
            <div className={`input-container relative `}>
                <input
                    placeholder='Enter Coupon Code'
                    value={value ?? ""}
                    className='text-color-dark-gray w-fit'
                    onChange={(e)=>{
                      /^[A-Za-z0-9 ]*$/.test((e.target.value?.toString()?.trim())) && 
                        setValue(e.target.value?.toString()?.toUpperCase())
                    }}
                />
                <span className={` ${!value || value === "" ? "opacity-60 ":"cursor-pointer"} px-2 sm:px-4 absolute right-0 top-0 bottom-0  flex justify-center items-center  text-white bg-secondary `} 
                  onClick={()=>{ ( value && value !== "") && handleApplyCoupon(value)}}>
                    {"Apply"}
                </span>
            </div>
        }
        {
          couponError &&
          <span className='text-[#2EB418] smallest-title'>{couponError}</span>
        }
         {
          couponDiscount &&
          <span className='text-[#2EB418] smallest-title'>{`You saved ${couponType === "INR"?"₹":""}${couponDiscount}${couponType === "PCT"?"%":""} with ${couponCode}`}</span>
        }
    </div>
  )
}

export default CouponCard