import React from 'react'
import QuantityInput from '../QuantityInput'
import Image from 'next/image'
import { convertToUnits, convertToUnitsExtraItem } from '@/commonjs/unitConversion'
import ExtraItems from './ExtraItems'

function ItemCard({
    itemsSelected,
    item,
    category,
    handleDeleteItem,
    handleChangeAdditionalQty,
    handleAddItem,
    noOfPeople,
    hideExtraItems
}) {
  const handleChangeExtraItem = (id, action) =>{
     
  }
    
  return (
    <>
      <div 
          className={` p-2 flex flex-col justify-between w-full items-start ${itemsSelected?.[item?.category?.slug]?.[item?.slug] ? "bg-[#FFFAEB]" :""} rounded-lg `}
        >
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
            {/* ITEM NAME, CHARGES AND ADD BUTTON */}
            <div className={`flex ${hideExtraItems ? "md:flex-col":"md:flex-row"} flex-col w-full md:justify-between gap-2`}>
              <div className='flex flex-col gap-1 sm:gap-2'>
                <div className='flex flex-col md:flex-row gap-1 md:gap-2'>
                  <p className={`description w-fit font-semibold`}>
                    {item?.item_name} 
                    <span className='description text-color-dark-gray font-medium'>
                      {
                        ( 
                          !(itemsSelected?.[item?.category?.slug]?.[item?.slug]) &&
                          (
                          (item?.preparations && Object.keys(item?.preparations)?.length > 0) || 
                          (item?.extra_items && Object.keys(item?.extra_items)?.length > 0)
                        )) ?
                        " (options available)"
                        :""
                      }
                    </span>
                  </p>
                </div>
                {
                  item?.additional_serving &&
                  <p className=' description font-bold'>{`Add-On Charges ₹ ${item?.additional_serving_rate}/ (Per Unit)`}</p>
                }
              </div>
              <div className=''>
                  {itemsSelected?.[item?.category?.slug]?.[item?.slug] ? 
                      <QuantityInput 
                        handleChangeQuantity={
                          (action) =>{
                            if(action === "sub" && Number(itemsSelected?.[item?.category?.slug]?.[item?.slug]?.additional_qty ?? 0) === 0){
                              handleDeleteItem(item?.category?.slug,item)
                            }else{

                              handleChangeAdditionalQty(item?.category?.slug,item?.slug, action === "sub" ? true:false)
                            }
                          }
                        }
                        label={
                          convertToUnits(item,itemsSelected, noOfPeople)
                        }
                        disableButtons={item?.extra_items && Object.keys(item?.extra_items)?.length > 0}
                        quantity={Number(itemsSelected?.[item?.category?.slug]?.[item?.slug]?.additional_qty ?? 0) ?? 0}
                      />
                      :
                      <div className='btn transparent-orange-btn text-color-secondary cursor-pointer py-1 px-2 sm:py-2 sm:px-2.5 w-[124px] h-fit' onClick={()=>{ handleAddItem(item?.category?.slug, item) }}>
                        {"Add"}
                      </div>
                  }
                </div>
            </div>
          </div>
          {/* EXTRA ITEMS AND PREPARATIONS */}
          <div className='mt-3 w-full'>
                  {/* SELECT PREPARATION */}
                  {
                    (itemsSelected?.[item?.category?.slug]?.[item?.slug] && item?.preparations && Object.keys(item?.preparations)?.length > 0)?
                    <div className='flex flex-col gap-2 w-full  md:ps-[116px]'>
                      <p className='description font-semibold'>Select Preparation</p>
                      {
                          Object.keys(item?.preparations).map((prep,prepIdx)=>{
                              const selected = itemsSelected?.[item?.category?.slug]?.[item?.slug]?.selected_preparation === prep ?? false;
                              return(
                                  <div key={"prep-"+prep} className='flex flex-row gap-2 w-full items-center'>
                                      <span className={`
                                              w-[16px] h-[16px] rounded-full border-[1px]
                                              ${selected ? "border-[#B42318]"
                                              :"border-[#D0D5DD] cursor-pointer"}
                                              flex justify-center items-center
                                              
                                          `}
                                          onClick={()=>{handleAddItem(item?.category?.slug,item,false,prep)}}
                                      >
                                        {
                                          selected && 
                                          <span className='rounded-full w-[6px] h-[6px] bg-primary '>
    
                                          </span>
                                        }
                                      </span>
                                      <p className='font-medium'>{item?.preparations[prep].name}</p>
                                  </div>
                              )
                          })
                      }
                    </div>
    
                    :""
                  
                  }
                  {/* EXTRA ITEMS */}
               
                
              </div>

      </div>
      {
                  (itemsSelected?.[item?.category?.slug]?.[item?.slug] && !hideExtraItems) &&
                  ((item?.extra_items && Object.keys(item?.extra_items)?.length > 0) ?
                  <ExtraItems 
                    item={item}
                    handleAddItem={handleAddItem ?? (()=>{})}
                    handleChangeAdditionalQty={handleChangeAdditionalQty ?? (()=>{})}
                    itemsSelected={itemsSelected ?? {}}
                  />
                    :"")
                }
    </>
  )
}

export default ItemCard