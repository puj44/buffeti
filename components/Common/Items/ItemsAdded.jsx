import Image from 'next/image'
import React, { useState } from 'react'
import QuantityInput from '../QuantityInput';
import { convertToUnits } from '@/commonjs/unitConversion';

function ItemsAdded({
    handleChangeAdditionalQty,
    handleDeleteItem,
    menuOption,
    itemsSelected,
    noOfPeople,
    categories
}) {
    const [isOpen,setOpen] = useState({});
  return (
    <div className='lg:max-w-[320px] xl:max-w-[350px] order-1 lg:order-2  w-full overflow-y-scroll overflow-x-hidden max-h-[820px]  bg-[#FAFAFA] z-20 p-2 sm:p-4 md:sticky md:top-0 mt-4 md:mt-0'>
        <div className='flex flex-col gap-4 w-full ' >
            {
                (itemsSelected && Object.keys(itemsSelected).length > 0) ?
                <div className='flex flex-col w-full sm:min-w-[291px] bg-[#F3F3F3]' >
                    <div className='flex flex-row justify-between items-center ps-6 pe-4 py-3 bg-primary md:justify-start rounded-t-lg text-white'>

                        <p >Selected Items</p>
                       
                    </div>
                    <div className={` pt-2 grid grid-flow-row gap-2`}>
                        {
                            Object.keys(itemsSelected).map((cat,index)=>{
                                const items = itemsSelected[cat];
                                return(
                                    <>
                                        <div 
                                            key={"category-items-"+cat} 
                                            className='bg-[#FFFAEB] flex flex-row justify-between items-center py-3 px-6'
                                        >
                                            <p>{categories[cat].name}</p>
                                            <div className='flex w-[24px] h-[24px] cursor-pointer' onClick={()=>{setOpen({...isOpen, [cat]: isOpen[cat] ? !isOpen[cat] :true});}}>
                                                <Image
                                                    src={"/arrows/dropdown.webp"}
                                                    width={12}
                                                    height={6}
                                                    priority
                                                    className={`${isOpen[cat]  ? "rotate-180":""} my-auto`}
                                                    alt="Arrow"
                                                />
                                            </div>
                                        </div>
                                        {
                                              Object.keys(items).map((it,idx)=>{
                                                const item = items[it];
                                                return(
                                                    <div key={"added-item-"+it} className={`${isOpen[cat] ? "grid":"hidden"} grid-flow-col p-2 bg-[#FFFAEB] rounded-lg gap-4 items-start justify-start`}>
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
                                    </>
                                )
                            })
                          
                        }
                    </div>
                </div>:""
            }
        </div>
    </div>
  )
}

export default ItemsAdded