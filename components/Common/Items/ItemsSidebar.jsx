import React from 'react'

function ItemsSideBar({
  activeItem,
  handleChangeActiveItem,
  items,
  itemsSelected
}) {
  return (
    <div className='md:flex flex-col gap-6 hidden md:w-[160px] 2xl:w-[220px] '>
        <p className='product-title'>Items</p>
        {
          (items && Object.keys(items)?.length > 0) && Object.keys(items).map((i,idx)=>{
            return(
              <h4 
                className={`product-title flex  flex-row gap-1 w-fit relative cursor-pointer items-center ${activeItem === i ? "active-sidebar my-auto" :""}`} 
                key={"item-"+idx} 
                onClick={()=>{handleChangeActiveItem(i)}}
              >
                <p className='w-fit'>{items[i]?.name}</p>
                {
                  (itemsSelected?.[i] && (Object.keys(itemsSelected?.[i]).length) > 0) &&
                  <div className=' '>
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