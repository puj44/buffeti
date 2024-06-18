import Image from 'next/image'
import React, { useEffect } from 'react'

function PeopleQuantityInput({quantity, handleChangeQuantity,isPackage}) {
    useEffect(()=>{
        document.getElementById("")
    },[])
  return (
    <div className={`flex flex-row justify-between items-center ${isPackage ? "gap-4 md:gap-6 lg:gap-8":""}`}>
        <p className='package-title'>Number of people</p>
        <div className='flex flex-row gap-1 items-center'>
            <div id={"decrease-quantity"} className={`flex items-center justify-center w-[24px]  h-[24px]  ${parseInt(quantity) === 10 ?"":"cursor-pointer"}`}
                onClick={(e)=>{handleChangeQuantity(e,true,(parseInt(quantity)-1))}} 
                >
                <Image
                    src={"/icons/qty_minus.webp"}
                    width={11.04}
                    height={10.32}
                    className={parseInt(quantity) === 10 ? "opacity-50" :""}
                    alt={"minus"}
                />
            </div>
            <div>
            <div className='people-input-quantity' id="quantity-update">

                <input className=' text-color-secondary overflow-hidden'  onChange={(e)=>{handleChangeQuantity(e)}} value={quantity ?? 10}  />
            </div>
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
    </div>
  )
}

export default PeopleQuantityInput