
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
    noOfPeople
}) {
    
  

  return (
        <div className='flex flex-col gap-6 w-full'>
            <SearchBar 
                handleSearchChange={handleSearchChange}
            />
            <div className=' '>
                <ItemsSlider 
                    items={{...items ?? {}}} 
                    itemsSelected={itemsSelected} 
                    category={category} 
                    handleAddItem={handleAddItem ?? (()=>{})} 
                    handleDeleteItem={handleDeleteItem ?? (()=>{})}
                    categories={{...categories ?? {}}}
                    handleChangeAdditionalQty={handleChangeAdditionalQty ?? (()=>{})}
                    noOfPeople={noOfPeople}
                />
            </div>
        </div>
  )
}

export default ItemsSelection