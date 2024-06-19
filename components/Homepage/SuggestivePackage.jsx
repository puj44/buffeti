import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import PackageSlider from './PackageSlider'; //DELETE
import PackageCard from './PackageCard';
import CustomiseOrderCard from './CustomiseOrderCard';
import Filters from '../Common/Packages/Filters';
import { useDispatch, useSelector } from 'react-redux';
import filterQuery from '@/commonjs/filterQuery';
import { getPackagesData } from '@/redux/reducers/packageReducer';
import { getCookie } from 'cookies-next';

function SuggestivePackage({data,filters,noOfPeople}) {
    const [activeFilters, setActiveFilters] = useState({
        category:Object.keys(filters?.categories)[0],
        no_of_people:noOfPeople ?? "10_20"
    });
    const [packagesData, setPackagesData] = useState({...data ?? {}});
    const {packages} = useSelector((state) => state.packages)
    const dispatch = useDispatch();


    useEffect(()=>{
        const filtersData = JSON.parse(JSON.stringify(activeFilters))
        const query = filterQuery(filtersData,{pricing:filters?.pricing});
        dispatch(getPackagesData({menuOption:"click2cater?"+query}));
    },[activeFilters]);

    useEffect(()=>{
        const data = Object.values(packages ?? {})?.[0];
        if(data && Object.keys(data).length > 0){
            setPackagesData({...data});
        }
    },[packages])

    const handleChangeFilter = (field,val) =>{
        let filtersData = JSON.parse(JSON.stringify(activeFilters)) 
        if(val === activeFilters?.[field]){
            if(field !== "category")
                delete filtersData[field];
        }else{
            filtersData = {
                ...filtersData,
                [field]:val
            }
        }
        setActiveFilters({...filtersData})
    }
  return (
    <div className='flex flex-col gap-4 md:gap-6  max-w-[1182px] w-full mx-auto  ' id={"suggestive-package"}>
        <h3 className='sub-title py-2 px-4 bg-[#FFEFEE] text-color-primary rounded-2xl w-fit font-medium md:font-semibold mx-auto  '>Click-to-cater</h3>
        <Filters 
            pricing={filters?.pricing} 
            activeFilters={activeFilters} 
            categories={filters?.categories} 
            packageCategory={true} 
            displayNoOfPeople={true} 
            handleChangeFilter={handleChangeFilter} 
        />
     <p className='hidden lg:block font-semibold sub-title pt-2'>Select Your Package</p>
        {/* ALL PACKAGES CARD */}
        <div className='grid grid-flow-col justify-between w-full gap-2 mt-[-4px]'>
            {
                (packagesData && Object.keys(packagesData).length > 0) &&
                Object.keys(packagesData).map((pd,idx)=>{
                    return(

                        <PackageCard key={"package-"+pd} numberOfPeople={activeFilters?.no_of_people ?? "10_20"}  data={packagesData[pd]} />
                    )
                })
            }
        </div>
        <CustomiseOrderCard />
    </div>
  )
}

export default SuggestivePackage