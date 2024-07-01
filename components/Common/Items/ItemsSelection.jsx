
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import ItemsSlider from './ItemsSlider';
import Image from 'next/image';

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
    menuOption,
    handleAddToCart
}) {
    
  

  return (
        <div className='flex flex-col order-2 md:order-1 gap-6 sm:w-full relative max-w-[991px]'>
            <SearchBar 
                handleSearchChange={handleSearchChange}
                itemsSelected={itemsSelected}
                handleAddItem={handleAddItem ?? (()=>{})} 
                handleDeleteItem={handleDeleteItem ?? (()=>{})}
                handleChangeAdditionalQty={handleChangeAdditionalQty ?? (()=>{})}
                noOfPeople={noOfPeople}
                menuOption={menuOption}
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
            <div className='flex justify-end '>
                <div 
                    className='btn primary-btn gap-1' 
                    style={{padding:"16px",paddingLeft:"28px",paddingRight:"28px"}}
                    onClick={()=>{handleAddToCart()}}
                >
                    <p className=''>Add to Cart</p>
                    <Image
                        src="/icons/cart.webp"
                        alt={"cart"}
                        width={20}
                        height={20}
                        priority
                    />
                </div>
            </div>
        </div>
  )
}

export default ItemsSelection