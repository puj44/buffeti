import Image from 'next/image'
import React from 'react'
import QuantityInput from '../Common/QuantityInput'
import { convertToUnits } from '@/commonjs/unitConversion'
import CartExtraItems from './CartExtraItems'

function CartItemCard({
    item,
    handleDeleteItem,
    handleChangeAdditionalQty,
    handleAddItem,
    noOfPeople,
    menuOption
}) {
  return (
    <>
        <div className='p-2 flex flex-col justify-between gap-1 w-full items-start'>
            <div className='flex flex-row gap-4 items-start justify-start w-fit md:w-full'>

                {/* IMAGE */}
                <div>
                    <Image
                        src={"/packages/dummy_pack.webp"}
                        width={102}
                        height={106}
                        alt={item?.item_name}
                    />
                </div>
                <div className='flex flex-col md:flex-row w-full md:justify-between gap-2 h-full'>
                    <div className='flex flex-col gap-1 sm:gap-2'>
                        <p className={`description-title w-fit font-semibold`}>
                            {item?.item_name} 
                        </p>
                        {
                            item?.item_description &&
                            <p className=' description-title '>{item.item_description}</p>
                        }
                        {
                            menuOption === "snack-boxes" &&
                            <p className=' description-title font-bold'>{`₹ ${item.rate_per_serving}/ Piece`}</p>
                        }
                        {
                            item?.additional_serving_rate &&
                            <p className=' description-title font-bold'>{`Add-On Charges ₹ ${item.additional_serving_rate}/ (Per ${item.additional_serving} ${item.unit})`}</p>
                        }
                    </div>
                    <div className='flex items-center my-auto'>
                        <QuantityInput 
                            handleChangeQuantity={
                            (action) =>{
                                if(action === "sub" && Number(item?.additional_qty ?? 0) === 0){
                                handleDeleteItem(item)
                                }else{

                                handleChangeAdditionalQty(item, action === "sub" ? true:false)
                                }
                            }
                            }
                            label={
                                convertToUnits(item,null, noOfPeople,true)
                            }
                            disableButtons={(item?.extra_items && Object.keys(item?.extra_items)?.length > 0 || menuOption === "snack-boxes" || !item?.additional_serving_rate)}
                            quantity={Number(item?.additional_qty ?? 0) ?? 0}
                        />
                    </div>
                </div>

            </div>
            {/* EXTRA ITEMS AND PREPARATIONS */}
            <div className=' w-full'>
                    {/* SELECT PREPARATION */}
                    {
                        (item?.preparations && Object.keys(item?.preparations)?.length > 0)?
                        <div className='flex flex-col gap-2 w-full mt-3 md:ps-[110px]'>
                        <p className='description-title font-semibold'>{"Select Preparation"}</p>
                        {
                            Object.keys(item?.preparations).map((prep,prepIdx)=>{
                                const selected = item?.selected_preparation === prep ?? false;
                                return(
                                    <div key={"prep-"+prep} className='flex flex-row gap-2 w-full items-center'>
                                        <span className={`
                                                w-[16px] h-[16px] rounded-full border-[1px]
                                                ${selected ? "border-[#B42318]"
                                                :"border-[#D0D5DD] cursor-pointer"}
                                                flex justify-center items-center
                                                
                                            `}
                                            onClick={()=>{handleAddItem(item,false,prep)}}
                                        >
                                            {
                                            selected && 
                                            <span className='rounded-full w-[6px] h-[6px] bg-primary '>
        
                                            </span>
                                            }
                                        </span>
                                        <p className='font-medium description-title'>{item?.preparations[prep].name}</p>
                                    </div>
                                )
                            })
                        }
                        </div>
        
                        :""
                    
                    }
                
                    
                </div>
        </div>
        {
                  ((item?.extra_items && Object.keys(item?.extra_items)?.length > 0) ?
                  <CartExtraItems 
                    item={item}
                    handleAddItem={handleAddItem ?? (()=>{})}
                    handleChangeAdditionalQty={handleChangeAdditionalQty ?? (()=>{})}
                  />
                    :"")
                }
    </>
  )
}

export default CartItemCard