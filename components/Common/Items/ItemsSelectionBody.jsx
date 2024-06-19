import React, { useEffect, useState } from 'react'
import ItemsSideBar from './ItemsSidebar';
import ItemsSelection from './ItemsSelection';


function ItemsSelectionBody({
  handleDeleteItem, 
  handleAddItem,
  itemsSelected,
  items,
  handleSearchChange,
  categories,
  activeItem,
  handleChangeActiveItem,
  handleChangeAdditionalQty,
  noOfPeople
}) {
 


  

  return (
    <div className='flex flex-row gap-6 w-full items-start'>
      {/* LEFT SIDE SECTION ITEMS CATEGORY SELECTION */}
      <ItemsSideBar activeItem={activeItem} itemsSelected={itemsSelected} items={categories} handleChangeActiveItem={handleChangeActiveItem} />
      <div className='h-full w-[1.5px] border-[1.5px] border-[#E3E5E5] hidden md:block'></div>
      {/* RIGHT SIDE SECTION ITEMS SELECTION */}
      <ItemsSelection 
        items={{...items ?? {}}} 
        handleSearchChange={handleSearchChange ?? (()=>{})} 
        category={activeItem} 
        handleDeleteItem={handleDeleteItem ?? (()=>{})} 
        handleAddItem={handleAddItem ?? (()=>{})} 
        itemsSelected={itemsSelected} 
        categories={{...categories ?? {}}}
        handleChangeAdditionalQty={handleChangeAdditionalQty ?? (()=>{})}
        noOfPeople={noOfPeople}
      />
    </div>
  )
}

export default ItemsSelectionBody