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
import ItemsMobileMenu from '../Common/Items/ItemsMobileMenu';

function Component({mealBox, data, filters,noOfPeople}) {
    const router = useRouter();
    const [activeFilters, setActiveFilters] = useState({
        category:Object.keys(filters?.categories ?? {})?.[0] ?? null,
        noOfPeople:noOfPeople
    });
    const [packagesData, setPackagesData] = useState({...data ?? {}});
    const {packages,response} = useSelector((state) => state.packages);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleChangeActiveItem = (val) =>{
        setLoading(true);
        setActiveFilters({...activeFilters, category:val})
    }
    
    useEffect(()=>{
        if(response){
            setTimeout(()=>{
                setPackagesData({...packages ?? {}});
                setLoading(false);
                dispatch(resetAction());
            },100)
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
        <h1 className="font-semibold sub-title">{mealBox === "click2cater" ? "Select Your Package":"Select Your Mini Meal"}</h1>
            <div className='grid grid-flow-col gap-6 justify-self-start h-full items-start'>

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
                <div className='contents md:hidden '>
                    <ItemsMobileMenu show={true}  activeItem={activeFilters?.category} itemsSelected={{}} items={filters?.categories} handleChangeActiveItem={handleChangeActiveItem} />
                </div>
                <div className=' w-[1.5px] h-full border-[1.5px] border-[#E3E5E5] hidden md:flex'></div>
                <div className='flex flex-col gap-6 w-full h-full'>
                    {/* <SearchBar 
                        handleSearchChange={handleSearchChange}
                    /> */}
                    {
                        isLoading?
                        <div className=' flex h-48 justify-center w-60 items-center'>
                            <div className='primary-loader m-auto'></  div>
                        </div>:
                        <div className='grid grid-flow-row sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  justify-between w-full gap-6'>

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
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Component