import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Filters from '../Common/Packages/Filters';
import { useDispatch, useSelector } from 'react-redux';
import filterQuery from '@/commonjs/filterQuery';
import { getPackagesData, resetAction } from '@/redux/reducers/packageReducer';
import CateringPackageCard from '../Common/CateringPackageCard';
import ItemsSideBar from '../Common/Items/ItemsSidebar';
import SearchBar from '../Common/Items/SearchBar';
import PackageCard from '../Homepage/PackageCard';

function Component({mealBox, data, filters,noOfPeople}) {
    const router = useRouter();
    const [activeFilters, setActiveFilters] = useState({
        category:Object.keys(filters?.categories ?? {})?.[0] ?? null,
        noOfPeople:noOfPeople
    });
    const [packagesData, setPackagesData] = useState({...data ?? {}});
    const {packages,response, isLoading} = useSelector((state) => state.packages);
    const dispatch = useDispatch();

    const handleChangeActiveItem = (val) =>{
        setActiveFilters({...activeFilters, category:val})
    }
    
    useEffect(()=>{
        if(response){
            setPackagesData({...packages ?? {}});
            dispatch(resetAction());
        }
    },[dispatch,response,packages])

    useEffect(()=>{
        const filtersData = JSON.parse(JSON.stringify(activeFilters))
        const query = filterQuery(filtersData,{pricing:filters?.pricing});
        dispatch(getPackagesData({menuOption:((mealBox+"?")+query)}));
    },[activeFilters]);

    const handleChangeFilter = (field,val) =>{
        let filtersData = JSON.parse(JSON.stringify(activeFilters)) 
        if(val === activeFilters?.[field]){
            delete filtersData[field];
        }else{
            filtersData = {
                ...filtersData,
                [field]:val
            }
        }
        setActiveFilters({...filtersData})
    }

    useEffect(()=>{
    },[router]);

    const clearFilters = () =>{
        setActiveFilters({});
    }

    const handleSearchChange = (e) =>{
        
    }

    const convertToName = (str) =>{
        let string = str?.toString()?.trim();
        string = string.replaceAll("-", " ");
        string = string.split(" ");
        string = string.filter((s) => s.charAt(0)?.toUpperCase() + s.slice(1));
        string = string.join(" ");
        return string
    }
  return (
    <div className='flex flex-col gap-6 page-spacing h-full py-6'>
      
        {/* <div className='hidden md:flex mx-auto w-full'>
            <Filters 
                pricing={filters?.pricing} 
                activeFilters={activeFilters} 
                categories={filters?.categories} 
                handleChangeFilter={handleChangeFilter} 
                clearFilters={clearFilters}
            />
        </div>
        <div className='block md:hidden'>
            <Filters 
                pricing={filters?.pricing} 
                activeFilters={activeFilters} 
                categories={filters?.categories} 
                handleChangeFilter={handleChangeFilter} 
                mobile={true}
                clearFilters={clearFilters}
            />
        </div> */}
        <div className='grid grid-flow-row gap-6  h-full items-start'>
        <h1 className="font-semibold sub-title  open-sans">{mealBox === "click2cater" ? "Packages":"Mini Meals"}</h1>
            <div className='grid grid-flow-col gap-6  h-full items-start'>

                <div className='hidden md:flex'>
                    <ItemsSideBar
                        itemsSelected={{}}
                        isCategory={true}
                        handleChangeActiveItem={handleChangeActiveItem}
                        activeItem={activeFilters?.category}
                        items={filters?.categories}
                        show={true}
                    />
                </div>
                <div className=' w-[1.5px] h-full border-[1.5px] border-[#E3E5E5] hidden md:flex'></div>
                <div className='flex flex-col gap-6 w-full'>
                    <SearchBar 
                        handleSearchChange={handleSearchChange}
                    />
                    <div className='grid grid-flow-row sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-flow-col justify-between w-full gap-6'>

                        {
                            (packagesData?.[activeFilters?.category] && Object.keys(packagesData?.[activeFilters?.category])?.length > 0) ?
                                Object.keys(packagesData?.[activeFilters?.category]).map((pd,idx) =>{
                                    const pack = packagesData?.[activeFilters?.category][pd];
                                    return(
                                        <PackageCard
                                            numberOfPeople={noOfPeople}
                                            menuOption={mealBox}
                                            key={"package-"+pd}
                                            data={{...pack ?? {}}}
                                        />
                                    )
                                })

                            :""
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Component