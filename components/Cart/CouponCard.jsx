import React, { useState } from 'react'

function CouponCard({handleApplyCoupon}) {
const [value, setValue] = useState();
  return (
    <div className='border-[1px] border-[#A8A8AD80] rounded-lg   flex flex-col p-4 gap-2 w-full'>
        <p>{"Apply Coupon"}</p>
        <div className='input-container relative'>
            <input
                placeholder='Enter Coupon Code'
                value={value ?? ""}
                className='text-color-dark-gray w-fit'
                onChange={(e)=>{/^[A-Za-z0-9 ]*$/.test((e.target.value?.toString()?.trim())) && setValue(e.target.value?.toString()?.toUpperCase())}}
            />
            <span className='px-2 sm:px-4 absolute right-0 top-0 bottom-0  flex justify-center items-center  text-white bg-secondary cursor-pointer' onClick={()=>{handleApplyCoupon(value)}}>
                {"Apply"}
            </span>
        </div>
    </div>
  )
}

export default CouponCard