import Image from 'next/image'
import React, { useState } from 'react'

function SearchBar({
    handleSearchChange
}) {

    const [isSearched, setSearched] = useState(false);

  return (
   
        <div className='search-bar md:max-w-[70%] 2xl:max-w-[40%] ' id="search-bar">
            <div className='w-[24px] h-[24px] flex align-middle items-center ' id="search-button">
                <Image
                    src={"/icons/search.webp"}
                    width={15}
                    height={15}
                    alt={"Search"}
                    priority
                />
            </div>
            <input 
                onChange={(e)=>{handleSearchChange(e)}}
                id="search-input"
                placeholder='Search "Italian Sandwich"'
                className='text-color-dark-gray'
            />
        </div>
  )
}

export default SearchBar