import Image from 'next/image'
import React, { useMemo } from 'react'

function ItemsSlider({
  items,
  handleAddItem,
  handleDeleteItem,
  category,
  itemsSelected
}) {


  return (
    <div className='flex flex-col gap-6'>
      {
        items && Object.keys(items).map((subCategory)=>{
          return(
            <div key={"item-"+subCategory} id={`body-${subCategory}`} className='flex flex-col gap-4'>
              <h5 className='item-name small-title'>{subCategory?.toString()?.toUpperCase()}</h5>
              {
                (items[subCategory]?.length > 0) &&
                items[subCategory].map((item,index)=>{
                  return(
                    <div 
                      key={"sub-item-"+index}
                      className={`p-2 flex flex-row justify-between w-full items-center ${itemsSelected?.[category]?.[item?.name] ? "bg-[#FFFAEB]" :""} rounded-lg `}
                    >
                      <div className='flex flex-row gap-4 items-center justify-start'>
                        <div>
                          <Image
                            src={item?.img}
                            width={item?.width}
                            height={item?.height}
                            alt={item?.name}
                          />
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p className={`description ${itemsSelected?.[category]?.[item?.name] ? "" :"font-medium"}`}>{item?.name}</p>
                          <p className='text-color-dark-gray description'>Add on charges ₹300</p>
                        </div>
                      </div>
                      <div className='btn transparent-orange-btn text-color-secondary cursor-pointer w-[124px] h-fit' onClick={()=>{ itemsSelected?.[category]?.[item?.name] ? handleDeleteItem(category, item,subCategory)  :handleAddItem(category, item,subCategory) }}>
                        {itemsSelected?.[category]?.[item?.name] ? "Remove":"Add"}
                      </div>

                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default ItemsSlider