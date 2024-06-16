import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import PackageSlider from './PackageSlider';
import PackageCard from './PackageCard';
import CustomiseOrderCard from './CustomiseOrderCard';
import Filters from '../Common/Packages/Filters';
import { useDispatch, useSelector } from 'react-redux';
import filterQuery from '@/commonjs/filterQuery';
import { getPackagesData } from '@/redux/reducers/packageReducer';

function SuggestivePackage({data,filters}) {
    const [activeCard, setActiveCard] = useState(Object.keys(data)[0]);
    const [activeFilters, setActiveFilters] = useState({
        category:Object.keys(filters.categories)[0],
        no_of_people:"10_20"
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
            setActiveCard(Object.keys(data)[0])
        }
    },[packages])

    const handleChangeCard = (val) =>{
        setActiveCard(val);
    }
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
    <div className='flex flex-col gap-4 md:gap-6 2xl:justify-center 2xl:self-center ' id={"suggestive-package"}>
        <h3 className='page-title font-medium md:font-semibold 2xl:text-center  open-sans'>Catering</h3>
           {/* CREATE PACKAGE CARD */}
           <div className='block lg:hidden'>
                <CustomiseOrderCard mobile={true} />
            </div>
        <Filters 
            pricing={filters?.pricing} 
            activeFilters={activeFilters} 
            categories={filters?.categories} 
            packageCategory={true} 
            displayNoOfPeople={true} 
            handleChangeFilter={handleChangeFilter} 
        />
     
        <p className='hidden lg:block font-medium product-title'>Select Your Package</p>
        <div className='grid grid-flow-row md:flex md:flex-row gap-5 '>
            {/* ALL PACKAGES CARD */}
            <div className='flex w-full'>
                <div className='grid grid-flow-row lg:grid-flow-col w-full gap-3 horizontal-scroll-div'>
                    <PackageSlider numberOfPeople={activeFilters?.no_of_people ?? "10_20"} packages={packagesData} active={activeCard} handleChangeCard={handleChangeCard}/>
                    <div className='hidden lg:block'>
                        <PackageCard numberOfPeople={activeFilters?.no_of_people ?? "10_20"} slug={activeCard} data={packagesData[activeCard]} />
                    </div>
                </div>
            </div>
            {/* CREATE PACKAGE CARD */}
            <div className='hidden lg:block'>
                <CustomiseOrderCard />
            </div>
        </div>
    </div>
  )
}

export default SuggestivePackage