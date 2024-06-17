import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import CateringBanner from '../Common/Packages/CateringBanner';
import Filters from '../Common/Packages/Filters';
import { useDispatch, useSelector } from 'react-redux';
import filterQuery from '@/commonjs/filterQuery';
import { getPackagesData, resetAction } from '@/redux/reducers/packageReducer';
import CateringPackageCard from '../Common/CateringPackageCard';

function Component({mealBox, data, filters,noOfPeople}) {
    const router = useRouter();
    const [activeFilters, setActiveFilters] = useState({});
    const [packagesData, setPackagesData] = useState({...data ?? {}});
    const {packages,response, isLoading} = useSelector((state) => state.packages);
    const dispatch = useDispatch();

    
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

    const convertToName = (str) =>{
        let string = str?.toString()?.trim();
        string = string.replaceAll("-", " ");
        string = string.split(" ");
        string = string.filter((s) => s.charAt(0)?.toUpperCase() + s.slice(1));
        string = string.join(" ");
        return string
    }
  return (
    <div className='flex flex-col gap-6 page-spacing py-6'>
        <h1 className="font-semibold sub-title 2xl:text-center open-sans">{mealBox === "click2cater" ? "Packages":"Mini Meals"}</h1>
        <div className='max-w-[1180px] 2xl:mx-auto w-full'>
            <CateringBanner />
           
        </div>
        <div className='hidden md:block'>
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
        </div>
        <div className='flex flex-col 2xl:items-center gap-6'>

            {
                (packagesData && Object.keys({...packagesData})?.length > 0) ? 
                    Object.keys({...packagesData}).map((pd,idx) => {
                        return(
                            <div key={"category-"+pd} className='grid grid-flow-row gap-6'>
                                <h3 className='font-medium product-title w-full h-fit p-2 bg-[#FAFAFA]'>{filters?.categories?.[pd] ?? convertToName(pd)}</h3>
                                {
                                Object.keys({...packagesData[pd]}).length > 0 ?
                                        <div className='grid grid-flow-row md:flex md:flex-wrap lg:grid lg:grid-cols-3 justify-between gap-4 md:gap-6 w-full'>
                                            {
                                                Object.keys({...packagesData[pd]}).map((pack,index)=>{
                                                    return(
                                                        <div key={"package-"+pack}>
                                                            <CateringPackageCard

                                                                pack={{...packagesData[pd][pack] ?? {}}}
                                                                packageName={pack}
                                                                slug={pack}
                                                                numberOfPeople={noOfPeople}
                                                                miniMeal={mealBox === "mini-meals" ? true :false}
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                :""
                                }

                            </div>
                        )
                    })

                :""
            }
        </div>
    </div>
  )
}

export default Component