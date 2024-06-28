import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ItemCard from './ItemCard';
import { resetSearch } from '@/redux/reducers/itemsReducer';

function SearchBar({
    handleSearchChange,
    placeholder,
    itemsSelected,
    handleAddItem,
    handleDeleteItem,
    handleChangeAdditionalQty,
    noOfPeople,
    menuOption
}) {

    const [isSearched, setSearched] = useState(false);
    const [searchData, setSearchData] = useState({});
    const {searchedItems,isSearchLoading} = useSelector((state) => state.items);
    const [isLoading, setLoading] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        setSearchData({...searchedItems ?? {}});
    },[searchedItems]);

    useEffect(()=>{
        setLoading(isSearchLoading);
    },[isSearchLoading])

    const handleClickEvent = (e) =>{
        if(e.target.id !== "search-box" && e.target.id !== "search-input" && e.target.id !== "search-button" && e.target.id !== "search-bar" && e.target.id !== "search-dropdown"){
            setSearched(false);
        }
      }

    useEffect(()=>{
        window.addEventListener("click",handleClickEvent );
        return () => window.removeEventListener("click", handleClickEvent);
      },[])


  return (
   
        <div className='search-bar relative md:max-w-[70%] 2xl:max-w-[60%] ' id="search-bar">
            <div className='w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] flex align-middle items-center ' id="search-button">
                <Image
                    src={"/icons/search.webp"}
                    width={15}
                    height={15}
                    className='w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]'
                    alt={"Search"}
                    priority
                />
            </div>
            <input 
                onChange={(e)=>{
                    handleSearchChange(e); 
                    setSearchVal(e.target.value); 
                    setSearched(true);
                    if(e.target.value === ""){
                        dispatch(resetSearch())
                    }
                }}
                onClick={()=>{setSearched(true)}}
                id="search-input"
                placeholder={placeholder ?? 'Search "Italian Sandwich"'}
                className='text-color-dark-gray  overflow-hidden placeholder'
            />
            <div className={`search-box ${isSearched && searchVal !== "" ? "flex" :"hidden"} `} id="search-box">
                <div id="search-dropdown" className={`w-full grid grid-flow-row p-4 overflow-y-scroll scrollbar rounded-lg gap-6 border-[1px] max-h-[420px] items-center ${isLoading ? "justify-center":"justify-start"} border-[#E3E5E5]`}>
                    {console.log(isLoading)}
                    {
                        isLoading ?
                        <div className='primary-loader'></div>
                        :
                        (searchData && Object.keys(searchData).length > 0) ?
                        
                            Object.keys(searchData).map(ite =>{return(
                                <ItemCard
                                    key={ite}
                                    item={searchData[ite]}
                                    handleDeleteItem={handleDeleteItem}
                                    handleChangeAdditionalQty={handleChangeAdditionalQty}
                                    handleAddItem={handleAddItem}
                                    noOfPeople={noOfPeople}
                                    hideExtraItems={true}
                                    itemsSelected={itemsSelected}
                                    menuOption={menuOption}
                                />
                            )})
                        

                        :<p>No results</p>
                    }
                </div>
            </div>
        </div>
  )
}

export default SearchBar