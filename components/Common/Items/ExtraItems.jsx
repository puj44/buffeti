import Image from 'next/image';
import React, { useRef, useState } from 'react'

function ExtraItems({
    item,
    handleAddItem,
    handleChangeAdditionalQty,
    itemsSelected
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const scrollToElement = (index) => {
        if (index >= 0 && index < Object.keys(item.extra_items)?.length) {
          const container = containerRef.current;
          const item = container.children[index];
          container.scrollLeft = index <= 0 ? 0 :item.offsetLeft;
            setCurrentIndex(index);
        }
    };
    const handleChangeExtraItem = (action) =>{
        if(action === "left"){
            if (currentIndex > 0) {
                scrollToElement(currentIndex - 1);
              }
        }else{
            if (currentIndex < Object.keys(item.extra_items)?.length - 1) {
                scrollToElement(currentIndex + 1);
            }
        }
    }
  return (
    <>
    {
      (Object.keys(item.extra_items)?.length >= 2) &&
      <div className='flex  justify-end pt-2'>
        <div className='flex flex-row gap-4'>
          <div className='w-[44px] h-[44px] cursor-pointer' onClick={()=>{handleChangeExtraItem("left")}}>
            <Image
              src={"/arrows/l_arrow_d.webp"}
              width={8}
              height={14}
              alt="arrow"
              className='cursor-pointer'
            />
          </div>
          <div className='w-[24px] h-[44px] cursor-pointer' onClick={()=>{handleChangeExtraItem("right")}}>
            <Image
              src={"/arrows/l_arrow_d.webp"}
              width={8}
              height={14}
              alt="arrow"
              className='cursor-pointer rotate-180 '
            />
          </div>
        </div>
      </div>
    }
    <div className='grid grid-flow-col justify-start  gap-3  overflow-x-hidden' id={`${item?.slug}-extra-items`} ref={containerRef}>
      {/* <p className='description'>Add ons</p> */}
      {
        Object.keys(item.extra_items).map((extra,extraIndex)=>{
          const extraItem = item.extra_items[extra];
          return(
            <div key={"extra-item-"+extra} className='border-[1px]  border-[#E3E5E5] rounded-lg w-max flex flex-col gap-4 max-w-[247px] p-4'>
                <p className='description font-medium'>{extraItem.item_name}</p>
                <p className='text-color-primary-gray pb-2' style={{borderBottomColor:"#E3E5E5", borderBottomWidth:"1px"}}>₹ {extraItem.rate_per_serving}/ piece ({extraItem.serving_per_pax+" "+extraItem.unit})</p>
                <div className='btn primary-btn cursor-pointer' 
                  onClick={()=>{ 
                    if(!itemsSelected?.[item.category.slug]?.[item?.slug]?.added_extra_items?.[extra]){

                      handleAddItem(item.category.slug, item,extra) 
                    }
                  }}
                >
                  {
                     Number(itemsSelected?.[item.category.slug]?.[item?.slug]?.added_extra_items?.[extra] ?? 0) > 0 ?

                    <div className='flex flex-row gap-4 items-center'>
                      <span className='rounded-[45px] h-[36px] w-[64px] bg-white flex justify-center items-center '
                        onClick={()=>{
                          handleChangeAdditionalQty(item.category.slug,item?.slug, true,extra)
                        }}
                      >
                        <span className='w-[14px] h-[2px] rounded-full bg-primary'>
                        </span>
                      </span>
                      <p className='text-white font-bold sub-title '>{Number(itemsSelected?.[item.category.slug]?.[item?.slug]?.added_extra_items?.[extra])}</p>
                      <span className='relative rounded-[45px] h-[36px] w-[64px] bg-white flex justify-center items-center '
                        onClick={()=>{
                          handleChangeAdditionalQty(item.category.slug,item?.slug, false,extra)
                        }}
                      >
                        <span className='absolute-center w-[14px] h-[2px] rounded-full bg-primary'>
                        </span>
                        <span className='absolute-center w-[2px] h-[14px] rounded-full bg-primary'>
                        </span>
                      </span>
                    </div>
                     :
                     <p className='font-bold sub-title leading-9'>
                      {`Add for ₹ ${extraItem.rate_per_serving}`}
                     </p>
                  }
                </div>
            </div>
          )
        })
      }
    </div>
  </>
  )
}

export default ExtraItems