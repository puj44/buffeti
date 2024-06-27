import React, { useEffect, useMemo, useState } from 'react'
import ItemsSideBar from './ItemsSidebar';
import ItemsSelection from './ItemsSelection';
import ItemsAdded from './ItemsAdded';
import ItemsMobileMenu from './ItemsMobileMenu';


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
  noOfPeople,
  menuOption,
  handleAddToCart
}) {
 
  const addedItems = useMemo(()=>{
    let items = {};
    itemsSelected && Object.keys(itemsSelected).map((i)=>{
      items = {...items, ...itemsSelected[i]};
    })
    
    return items ?? {}
  },[itemsSelected])


  

  return (
    <div className='flex flex-col md:flex-row md:gap-6 w-full items-start '>
      {/* LEFT SIDE SECTION ITEMS CATEGORY SELECTION */}
      <div className='hidden md:flex'>
        <ItemsSideBar show={true} activeItem={activeItem} itemsSelected={itemsSelected} items={categories} handleChangeActiveItem={handleChangeActiveItem} />
      </div>
      <div className='flex md:hidden'>
        <ItemsMobileMenu show={true} activeItem={activeItem} itemsSelected={itemsSelected} items={categories} handleChangeActiveItem={handleChangeActiveItem} />
      </div>
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
        menuOption={menuOption}
        handleAddToCart={handleAddToCart ?? (()=>{})}
      />
      {
        addedItems && Object.keys(addedItems).length > 0?
        <ItemsAdded
          items={{...addedItems}}
          handleChangeAdditionalQty={handleChangeAdditionalQty ?? (()=>{})}
          handleDeleteItem={handleDeleteItem ?? (()=>{})} 
          menuOption={menuOption}
          noOfPeople={noOfPeople}
          itemsSelected={itemsSelected} 
        />:""
      }
    </div>
  )
}

export default ItemsSelectionBody