import Image from 'next/image'
import React, { useEffect } from 'react'

function QuantityInput({label ,handleChangeQuantity,disableButtons}) {
    useEffect(()=>{
        document.getElementById("")
    },[])
  return (
    <div className='input-quantity'>
        <div id={"decrease-quantity"} className={`flex items-center justify-center w-[24px]  h-[24px] cursor-pointer`}
            onClick={(e)=>{handleChangeQuantity("sub")}} 
            >
            <Image
                src={"/icons/qty_minus.webp"}
                width={11.04}
                height={10.32}
                alt={"minus"}
            />
        </div>
        <div>
        <label>{label?.includes("glass") ? label?.replace("glass","cup"): label}</label>
        </div>
        <div id="increase-quantity" className={` flex items-center justify-center w-[24px]  h-[24px] ${disableButtons ? "opacity-50":"cursor-pointer"}`}
            onClick={(e)=>{!disableButtons && handleChangeQuantity("add")}}
            >
            <Image
                src={"/icons/qty_plus.webp"}
                width={11.04}
                height={11.04}
                alt={"plus"}
            />
        </div>
    </div>
  )
}

export default QuantityInput