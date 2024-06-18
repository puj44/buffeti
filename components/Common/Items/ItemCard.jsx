import React from 'react'
import QuantityInput from '../QuantityInput'
import Image from 'next/image'
const units = {
    "ml":"ltr",
    "mls":"ltr",
    "gm":"kg",
    "gms":"kg",
  }
function ItemCard({
    itemsSelected,
    item,
    category,
    handleDeleteItem,
    handleChangeAdditionalQty,
    handleAddItem,
    noOfPeople
}) {
    const convert = (qty,unit) =>{
        let newTotalQty = qty;
        let newUnit = unit;
        if(newTotalQty >= 500 && units[newUnit]){
          newTotalQty = newTotalQty / 1000;
          const fixed = Math.pow(10, 2);
          newTotalQty = Math.floor(newTotalQty * fixed) / fixed;
          newUnit = units[newUnit];
        }
        return {newTotalQty, newUnit}
      }
    
      const convertToUnits = (item) =>{
        const additionalQty = Number(itemsSelected?.[category]?.[item.slug]?.additional_qty ?? 0);
        const additionalUnits = additionalQty > 0 ? additionalQty * Number(item.additional_serving_rate) :0;
        const totalQty = additionalUnits+(Number(item.serving_per_pax) * Number(noOfPeople));
        const unit = item.unit;
        
        const {newTotalQty, newUnit} = convert(totalQty,unit);
        return `${newTotalQty} ${newUnit}`;
      }
      const convertToUnitsExtraItem = (extraItem,item) =>{
        const qty = Number(itemsSelected?.[category]?.[item.slug]?.added_extra_items?.[extraItem.slug] ?? 0);
        const totalQty = qty === 0 ? Number(extraItem.serving_per_pax) : qty * Number(extraItem.serving_per_pax);
        
        const unit = extraItem.unit;
        const {newTotalQty, newUnit} = convert(totalQty,unit);
        return `${newTotalQty} ${newUnit}`;
      }
  return (
    <div 
                     
                      className={`p-2 flex flex-col justify-between w-full items-start ${itemsSelected?.[category]?.[item?.slug] ? "bg-[#FFFAEB]" :""} rounded-lg `}
                    >
                      <div className='flex flex-row gap-4 items-start justify-start w-full'>

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
                        <div className='flex flex-col md:flex-row w-full md:justify-between gap-2'>
                          <div className='flex flex-col gap-2'>
                            <div className='flex flex-col md:flex-row gap-1 md:gap-2'>
                              <p className={`description w-fit ${itemsSelected?.[category]?.[item?.slug] ? "" :"font-medium"}`}>
                                {item?.item_name} 
                                <span className='description text-color-dark-gray font-medium'>
                                  {
                                    ( 
                                      !(itemsSelected?.[category]?.[item?.slug]) &&
                                      (
                                      (item.preparations && Object.keys(item.preparations)?.length > 0) || 
                                      (item.extra_items && Object.keys(item.extra_items)?.length > 0)
                                    )) ?
                                    " (options available)"
                                    :""
                                  }
                                </span>
                              </p>
                            </div>
                            {
                              item?.additional_serving &&
                              <p className='text-color-dark-gray description'>{`Add on charges ₹ ${item?.additional_serving_rate}`}</p>
                            }
                          </div>
                          <div className=''>
                              {itemsSelected?.[category]?.[item?.slug] ? 
                                  <QuantityInput 
                                    handleChangeQuantity={
                                      (action) =>{
                                        if(action === "sub" && Number(itemsSelected?.[category]?.[item?.slug]?.additional_qty ?? 0) === 0){
                                          handleDeleteItem(category,item)
                                        }else{

                                          handleChangeAdditionalQty(category,sc, action === "sub" ? true:false)
                                        }
                                      }
                                    }
                                    label={
                                      convertToUnits(item)
                                    }
                                    disableButtons={item?.extra_items && Object.keys(item?.extra_items)?.length > 0}
                                    quantity={Number(itemsSelected?.[category]?.[item?.slug]?.additional_qty ?? 0) ?? 0}
                                  />
                                  :
                                  <div className='btn transparent-orange-btn text-color-secondary cursor-pointer w-[124px] h-fit' onClick={()=>{ handleAddItem(category, item) }}>
                                    {"Add"}
                                  </div>
                              }
                            </div>
                        </div>
                      </div>
                      {/* EXTRA ITEMS AND PREPARATIONS */}
                      <div className='md:ps-[100px] mt-3 w-full'>
                            {
                              itemsSelected?.[category]?.[item?.slug] &&
                              ((item.extra_items && Object.keys(item.extra_items)?.length > 0) ?
                                <>
                                  <div className='flex flex-col gap-2 w-full'>
                                    <p className='description'>Add ons</p>
                                    {
                                      Object.keys(item.extra_items).map((extra,extraIndex)=>{
                                        return(
                                          <div key={"extra-item-"+extra} className='w-full items-start flex flex-col gap-2 md:flex-row justify-between'>
                                            <div className='flex flex-col gap-2'>
                                              <p className='description font-medium md:font-normal'>{item.extra_items[extra].item_name}</p>
                                              <p className='description'>Add on charges ₹ {item.extra_items[extra].rate_per_serving}/ piece</p>
                                            </div>
                                            {
                                              Number(itemsSelected?.[category]?.[item?.slug]?.added_extra_items?.[extra]) >= 0 ?
                                              <QuantityInput 
                                                handleChangeQuantity={
                                                  (action) =>{
                                                    if(action === "sub" && Number(itemsSelected?.[category]?.[item?.slug]?.added_extra_items?.[extra] ?? 0) === 0){
                                                      handleDeleteItem(category,item,extra)
                                                    }else{

                                                      handleChangeAdditionalQty(category,sc, action === "sub" ? true:false,extra)
                                                    }
                                                  }
                                                }
                                                label={
                                                  convertToUnitsExtraItem(item.extra_items[extra],item)
                                                }
                                              />:
                                              <div className='btn transparent-orange-btn text-color-secondary cursor-pointer w-[124px] h-fit' onClick={()=>{ handleAddItem(category, item,extra) }}>
                                                {"Add"}
                                              </div>
                                            }
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                </>
                              :(item.preparations && Object.keys(item.preparations)?.length > 0)?
                              <div className='flex flex-col gap-2 w-full'>
                                <p className='description'>Select Preparation</p>
                                {
                                    Object.keys(item.preparations).map((prep,prepIdx)=>{
                                        const selected = itemsSelected?.[category]?.[item.slug]?.selected_preparation === prep ?? false;
                                        return(
                                            <div key={"prep-"+prep} className='flex flex-row gap-2 w-full items-center'>
                                                <span className={`
                                                        w-[24px] h-[24px] rounded-full border-[1px]
                                                        ${selected ? "border-[#E3E5E5] bg-primary"
                                                        :"border-[#717171B2] cursor-pointer"}
                                                        flex justify-center items-center
                                                        
                                                    `}
                                                    onClick={()=>{handleAddItem(category,item,false,prep)}}
                                                >
                                                    <Image
                                                        src={"/icons/tickmark.webp"}
                                                        width={11.73}
                                                        height={8.94}
                                                        alt={"tick"}
                                                        loading='lazy'
                                                    />
                                                </span>
                                                <p>{item.preparations[prep].name}</p>
                                            </div>
                                        )
                                    })
                                }
                              </div>

                              :"")
                            }
                          </div>

                    </div>
  )
}

export default ItemCard