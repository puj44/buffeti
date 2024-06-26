
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import ItemsSlider from './ItemsSlider';

function ItemsSelection({
    items,
    handleAddItem,
    handleDeleteItem,
    category,
    itemsSelected,
    handleSearchChange,
    categories,
    handleChangeAdditionalQty,
    noOfPeople,
    menuOption
}) {
    
  

  return (
        <div className='flex flex-col gap-6 sm:w-full relative'>
            <SearchBar 
                handleSearchChange={handleSearchChange}
            />
                <ItemsSlider 
                    items={{...items ?? {}}} 
                    itemsSelected={itemsSelected} 
                    category={category} 
                    handleAddItem={handleAddItem ?? (()=>{})} 
                    handleDeleteItem={handleDeleteItem ?? (()=>{})}
                    categories={{...categories ?? {}}}
                    handleChangeAdditionalQty={handleChangeAdditionalQty ?? (()=>{})}
                    noOfPeople={noOfPeople}
                    menuOption={menuOption}
                />
        </div>
  )
}

export default ItemsSelection