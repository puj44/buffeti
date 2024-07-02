import Image from 'next/image'
import React, { useState } from 'react'
import QuantityInput from '../QuantityInput';
import { convertToUnits } from '@/commonjs/unitConversion';

function ItemsAdded({
    items,
    handleChangeAdditionalQty,
    handleDeleteItem,
    menuOption,
    itemsSelected,
    noOfPeople,
    handleAddToCart
}) {
    const [isOpen,setOpen] = useState(true);
  return (
    <div className='max-w-[350px]  order-1 md:order-2  w-full overflow-y-scroll overflow-x-hidden max-h-[820px]  bg-[#FAFAFA] p-2 sm:p-4 md:sticky md:top-0 mt-4 md:mt-0'>
        <div className='flex flex-col gap-4 w-full ' >
            {
                (items && Object.keys(items).length > 0) ?
                <div className='flex flex-col w-full sm:min-w-[291px]' open={isOpen}>
                    <div className='flex flex-row justify-between items-center ps-6 pe-4 py-3 bg-primary md:justify-start rounded-t-lg text-white'>

                        <p >Selected Items</p>
                        <div className='flex md:hidden w-[24px] h-[24px] ' onClick={()=>{setOpen(!isOpen);}}>
                            <Image
                                src={"/arrows/arrow_down.webp"}
                                width={12}
                                height={6}
                                priority
                                className={`${isOpen?"rotate-180":""} my-auto`}
                                alt="Arrow"
                            />
                        </div>
                    </div>
                    <div className={`${isOpen?"grid":"hidden md:grid"} pt-6 bg-[#FFFAEB] rounded-b-lg p-2 grid grid-flow-row gap-4`}>
                        {
                            Object.keys(items).map((it,idx)=>{
                                const item = items[it];
                                return(
                                    <div key={"added-item-"+it} className='grid grid-flow-col gap-4 items-start justify-start'>
                                        <div className='w-[100px] h-[100px]'>
                                            <Image
                                                src={"/packages/dummy_pack.webp"}
                                                width={102}
                                                height={106}
                                                // style={{width:"100%",height:"100%"}}
                                                alt={item?.item_name}
                                            />
                                        </div>
                                        <div className='flex flex-col items-start gap-4'>
                                            <p className={`description-title w-fit font-semibold`}>
                                                {item?.item_name} 
                                                <span className='description-title text-color-dark-gray font-medium'>
                                                {
                                                    ( 
                                                    
                                                    (
                                                    (item.preparations && Object.keys(item.preparations)?.length > 0) || 
                                                    (item.extra_items && Object.keys(item.extra_items)?.length > 0)
                                                    )) ?
                                                    " (options available)"
                                                    :""
                                                }
                                                </span>
                                            </p>
                                            <QuantityInput 
                                                handleChangeQuantity={
                                                (action) =>{
                                                    if(action === "sub" && Number(item?.additional_qty ?? 0) === 0){
                                                    handleDeleteItem(item?.category?.slug,item)
                                                    }else{

                                                    handleChangeAdditionalQty(item?.category?.slug,item?.slug, action === "sub" ? true:false)
                                                    }
                                                }
                                                }
                                                label={
                                                convertToUnits(item,itemsSelected,noOfPeople)
                                                }
                                                disableButtons={item?.extra_items && Object.keys(item?.extra_items)?.length > 0}
                                                quantity={Number(item?.additional_qty ?? 0) ?? 0}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>:""
            }
             <div className='flex justify-end '>
                <div 
                    className='btn primary-btn gap-1' 
                    style={{padding:"16px",paddingLeft:"28px",paddingRight:"28px"}}
                    onClick={()=>{handleAddToCart()}}
                >
                    <p className=''>Add to Cart</p>
                    <Image
                        src="/icons/cart.webp"
                        alt={"cart"}
                        width={20}
                        height={20}
                        priority
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemsAdded