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
 
  // const addedItems = useMemo(()=>{
  //   let items = {};
  //   itemsSelected && Object.keys(itemsSelected).map((i)=>{
  //     items = {...items, ...itemsSelected[i]};
  //   })
    
  //   return items ?? {}
  // },[itemsSelected])


  

  return (
    <div className='flex flex-col md:flex-row md:gap-6 w-full items-start items-section'>
      {/* LEFT SIDE SECTION ITEMS CATEGORY SELECTION */}
      <div className='hidden md:flex sticky top-0 left-0 h-fit bg-white'>
        <ItemsSideBar show={true} activeItem={activeItem} itemsSelected={itemsSelected} items={categories} handleChangeActiveItem={handleChangeActiveItem} />
      </div>
      <div className='contents md:hidden'>
        <ItemsMobileMenu show={true} activeItem={activeItem} itemsSelected={itemsSelected} items={categories} handleChangeActiveItem={handleChangeActiveItem} />
      </div>
      <div className='h-full  w-[1.5px] border-[1.5px] border-[#E3E5E5] hidden md:block'></div>
      <div className='flex flex-col lg:flex-row gap-6 w-full items-start items-section'>
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
          itemsSelected && Object.keys(itemsSelected).length > 0?
          <ItemsAdded
          itemsSelected={itemsSelected}
            handleChangeAdditionalQty={handleChangeAdditionalQty ?? (()=>{})}
            handleDeleteItem={handleDeleteItem ?? (()=>{})} 
            menuOption={menuOption}
            noOfPeople={noOfPeople}
            categories={categories}
          />:""
        }
      </div>
    </div>
  )
}

export default ItemsSelectionBody