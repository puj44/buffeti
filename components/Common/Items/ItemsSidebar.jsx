import React from 'react'

function ItemsSideBar({
  activeItem,
  handleChangeActiveItem,
  items,
  itemsSelected,
  isCategory,
  show
}) {
  if(show)
  return (
    <div className='flex flex-col gap-3 md:w-[160px] 2xl:w-[220px] '>
        <p className='product-title font-bold mb-3' style={{borderBottomWidth:"1px", borderBottomColor:"#E3E5E5"}}>{`Select ${isCategory ? "Category":"Items"}`}</p>
        {
          (items && Object.keys(items)?.length > 0) && Object.keys(items).map((i,idx)=>{
            return(
              <h4 
                className={`product-title flex  flex-row gap-1 w-full relative cursor-pointer items-center ${activeItem === i ? "active-sidebar my-auto" :""}`} 
                key={"item-"+idx} 
                onClick={()=>{handleChangeActiveItem(i)}}
              >
                <p className=' py-1 font-medium'>{items[i]?.name ?? items[i]}</p>
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