import React from 'react'

function ItemsSideBar({
  activeItem,
  handleChangeActiveItem,
  items,
  itemsSelected
}) {
  return (
    <div className='md:flex flex-col gap-6 hidden md:w-[160px] '>
        <p className='product-title'>Items</p>
        {
          items?.length && items.map((i,idx)=>{
            return(
              <h4 
                className={`product-title flex  text-nowrap flex-row gap-1 w-fit relative cursor-pointer items-center ${activeItem === i ? "active-sidebar my-auto" :""}`} 
                key={"item-"+idx} 
                onClick={()=>{handleChangeActiveItem(i)}}
              >
                {i}
                {
                  (itemsSelected?.[i] && (Object.keys(itemsSelected?.[i]).length) > 0) &&
                  <div className='absolute right-[-28px] top-[50%] translate-y-[-50%] '>
                    <div className='item-number relative'>
                      <p className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-52%] number '>{Object.keys(itemsSelected?.[i]).length}</p>
                    </div>
                  </div>
                }
              </h4>
            )
          })
        }
    </div>
  )
}

export default ItemsSideBar