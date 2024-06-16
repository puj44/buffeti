import Image from 'next/image'
import React, { useEffect } from 'react'

function QuantityInput({quantity, handleChangeQuantity,handleMouseUp}) {
    useEffect(()=>{
        document.getElementById("")
    },[])
  return (
    <div className='input-quantity'>
        <div id={"decrease-quantity"} className='flex items-center justify-center w-[24px]  h-[24px] cursor-pointer' 
            onClick={(e)=>{handleChangeQuantity(e,true,(parseInt(quantity)-1))}} 
            >
            <Image
                src={"/icons/qty_minus.webp"}
                width={11.04}
                height={10.32}
                alt={"minus"}
            />
        </div>
        <div>

        <input id="quantity-update" onChange={(e)=>{handleChangeQuantity(e)}} value={quantity ?? 10}  />
        </div>
        <div id="increase-quantity" className='cursor-pointer flex items-center justify-center w-[24px]  h-[24px]' 
            onClick={(e)=>{handleChangeQuantity(e,true,(parseInt(quantity)+1))}}
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