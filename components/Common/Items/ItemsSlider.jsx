import Image from 'next/image'
import React, { useMemo } from 'react'
import QuantityInput from '../QuantityInput';
import ItemCard from './ItemCard';



function ItemsSlider({
  items,
  handleAddItem,
  handleDeleteItem,
  category,
  itemsSelected,
  categories,
  handleChangeAdditionalQty,
  noOfPeople
}) {



  return (
    <div className='flex flex-col gap-6'>
      {
        items && Object.keys(items).map((subCategory)=>{
          return(
            <div key={"item-"+subCategory} id={`body-${subCategory}`} className='flex flex-col gap-4'>
              {
                categories[category]?.sub_categories?.[subCategory]?.toString()?.toUpperCase() &&
                <h5 className='item-name small-title'>{categories[category]?.sub_categories?.[subCategory]?.toString()?.toUpperCase()}</h5>
              }
              {
                (items[subCategory] && Object.keys(items[subCategory])?.length > 0) &&
                Object.keys(items[subCategory]).map((sc,index)=>{
                  const item = items[subCategory][sc];
                  return(
                    <ItemCard 
                      key={"item-"+sc}
                      itemsSelected={itemsSelected}
                      item={item}
                      noOfPeople={noOfPeople}
                      handleChangeAdditionalQty={handleChangeAdditionalQty ?? (()=>{})}
                      handleDeleteItem={handleDeleteItem ?? (()=>{})}
                      handleAddItem={handleAddItem ?? (()=>{})}
                      category={item?.category?.slug}
                    />
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