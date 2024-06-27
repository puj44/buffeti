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
  noOfPeople,
  menuOption
}) {



  return (
    <div className='grid grid-flow-row gap-6'>
      {
        items && Object.keys(items).map((subCategory)=>{
          let item = items[subCategory];
          return(
            <div key={"item-"+subCategory} id={`body-${subCategory}`} className='grid grid-flow-row gap-4 '>
              {
                (categories[category]?.sub_categories) &&
                <h5 className='item-name small-title'>{categories[category]?.sub_categories?.[subCategory]?.toString()?.toUpperCase() ?? category?.toString()?.toUpperCase()}</h5>
              }
              {
                (menuOption !== "snack-boxes" )?
                (items[subCategory] && Object.keys(items[subCategory])?.length > 0) &&
                Object.keys(items[subCategory]).map((sc,index)=>{
                  item = items[subCategory][sc];
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
                :
                <ItemCard 
                  key={"item-"+subCategory}
                  itemsSelected={itemsSelected}
                  item={item}
                  noOfPeople={noOfPeople}
                  handleChangeAdditionalQty={handleChangeAdditionalQty ?? (()=>{})}
                  handleDeleteItem={handleDeleteItem ?? (()=>{})}
                  handleAddItem={handleAddItem ?? (()=>{})}
                  category={item?.category?.slug}
                />
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default ItemsSlider