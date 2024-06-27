import React from 'react'

function ItemsSideBar({
  activeItem,
  handleChangeActiveItem,
  items,
  itemsSelected,
  isCategory,
  show
}) {
  const onClick = (subCategory) =>{
    const element = document.getElementById("body-"+subCategory);
    const topPos = element.offsetTop - 5;
    window.scrollTo(0,topPos)
  }
  if(show)
  return (
    <div className='flex flex-col gap-3 md:w-[160px] 2xl:w-[220px] '>
        <p className='product-title font-bold mb-3' style={{borderBottomWidth:"1px", borderBottomColor:"#E3E5E5"}}>{`Select ${isCategory ? "Category":"Items"}`}</p>
        {
          (items && Object.keys(items)?.length > 0) && Object.keys(items).map((i,idx)=>{
            const item = items[i];
            return(
              <>
                <h4 
                  className={`product-title flex  flex-row gap-1 w-full relative cursor-pointer items-center sidebar ${activeItem === i ? "active-sidebar my-auto" :""}`} 
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
                {
                  (activeItem === i && item.sub_categories && Object.keys(item.sub_categories).length > 0) ?
                  <div className='ps-2 flex flex-col gap-4'>
                    {
                      Object.keys(item.sub_categories).map((sub)=>{
                        return(
                          <p key={sub} onClick={()=>{onClick(sub)}} className='text-color-primary cursor-pointer'>{item.sub_categories[sub]}</p>
                        )
                      })
                    }
                  </div>:""
                }
              </>
            )
          })
        }
    </div>
  )
}

export default ItemsSideBar