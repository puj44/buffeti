import React, { useState } from 'react'

function CouponCard({handleApplyCoupon}) {
const [value, setValue] = useState();
  return (
    <div className='border-[1px] border-[#A8A8AD80] rounded-lg w-full flex flex-col p-4 gap-2'>
        <p>{"Apply Coupon"}</p>
        <div className='input-container w-full'>
            <input
                placeholder='Enter Coupon Code'
                value={value ?? ""}
                className='text-color-dark-gray'
                onChange={(e)=>{/^[A-Za-z0-9 ]*$/.test((e.target.value?.toString()?.trim())) && setValue(e.target.value?.toString()?.toUpperCase())}}
            />
            <span className='w-[100px] flex justify-center items-center  text-white bg-secondary cursor-pointer' onClick={()=>{handleApplyCoupon(value)}}>
                {"Apply"}
            </span>
        </div>
    </div>
  )
}

export default CouponCard