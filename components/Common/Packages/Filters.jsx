import { Dropdown, Flowbite } from 'flowbite-react';
import Image from 'next/image'
import React, { useState } from 'react'
import Tickmark from '../Tickmark';
const noOfPeople = [
    {
        label:"10 - 20 People",
        value:"10_20",
        img:"/filters/people_one.webp",
        width:20,
        height:20
    },
    {
        label:"20 - 30 People",
        value:"20_30",
        img:"/filters/people_two.webp",
        width:28,
        height:16
    },
    {
        label:"30+ People",
        value:"30_plus",
        img:"/filters/people_three.webp",
        width:28,
        height:20
    },
]

const customTheme = {
    dropdown:{
        floating:{
            divider:"my-1 h-px bg-[#E3E5E5]",
            item:{
                container: "",
                base: "flex p-0 cursor-pointer px-0 py-0 items-center justify-start small-title focus:outline-none",
                icon: "mr-2 h-4 w-4"
            },
            
    
            style:{
                dark:"dropdown-box",
                light:"dropdown-box",
                auto:"dropdown-box",
            }
        }
    }
  };

function Filters({
    pricing, 
    displayNoOfPeople,
    activeFilters,
    handleChangeFilter,
    packageCategory,
    categories,
    mobile,
    clearFilters
}) {

    const onClose = () =>{
        document.getElementById("filter-box-dropdown").click()
    }
if(mobile)
    return(
        <div className='flex flex-row gap-2 overflow-x-scroll w-full'>
            <Flowbite theme={customTheme}>
                    <Dropdown label="" dismissOnClick={false}  placement='bottom' renderTrigger={() =>  
                        <div className=' filter-box inter' id="filter-box-dropdown">
                            <Image
                                src={"/icons/filter.webp"}
                                width={16}
                                height={16}
                                alt={"filter"}
                                priority
                                
                            />
                            
                            <p className='w-fit' style={{fontSize:"14px"}}>Filter</p>
                        </div>
                    }>
                        <div>
                            <Dropdown.Item as='div' className={`ps-4 flex flex-col gap-4 justify-start w-full  inter`} >
                                <div className='flex flex-row justify-between w-full min-w-[200px] items-center'>
                                    <p className='font-medium big-title'>Filter</p>
                                    <Image
                                        src={"/icons/cross.webp"}
                                        width={12}
                                        height={12}
                                        priority
                                        alt='cross'
                                        className='cursor-pointer'
                                        onClick={()=>{onClose()}}
                                    />
                                </div>
                                <div className='flex flex-col gap-2 self-baseline w-full' style={{fontSize:"14px"}}>
                                    {
                                        pricing?.length > 0 ?
                                            <>
                                                <div className='flex flex-col gap-2 '>
                                                    <p className='' style={{fontSize:"14px"}}>Pricing</p>
                                                    {pricing.map((p,idx) => {
                                                        return(
                                                            <div 
                                                                className={`flex flex-row items-center gap-2`} 
                                                                key={"price-"+idx}
                                                                onClick={()=>{
                                                                    handleChangeFilter("pricing",idx)
                                                                }}
                                                            >
                                                            
                                                                <Tickmark isSelected={activeFilters?.pricing === idx} />
                                                                <p>{!p?.max ? `₹ ${p.min} +` :`₹ ${p.min}-₹ ${p.max}`}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            
                                            </>
                                        :""
                                    }   
                                        <Dropdown.Divider className='w-full'  />
                                    {
                                        (categories && Object.keys(categories)?.length > 0) ?
                                            <>
                                                <div className='flex flex-col gap-2 '>
                                                    <p>Categories</p>
                                                    {Object.keys(categories).map((cat,idx) => {
                                                        return(
                                                            <div 
                                                                className={`flex flex-row items-center gap-2`} 
                                                                key={"category-"+idx}
                                                                onClick={()=>{
                                                                    handleChangeFilter("category",cat)
                                                                }}
                                                            >
                                                            
                                                                <Tickmark isSelected={cat === activeFilters?.category} />
                                                                <p>{categories[cat]}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </>
                                        :""
                                    }  
                                    
                                </div>
                                <Dropdown.Divider className='w-full'  />
                                <div className='flex flex-row w-full justify-between items-center' style={{fontSize:"14px"}} >
                                    <p className='text-color-primary font-medium' onClick={()=>{clearFilters(); onClose()}}>Clear All</p>
                                </div>
                            </Dropdown.Item>                 
                        </div>
                    </Dropdown>
            </Flowbite>
            {
                activeFilters?.category &&
                <div 
                    className={`filter-box  w-full cursor-pointer active-filter-box`} 
                    onClick={()=>{
                        handleChangeFilter("category",activeFilters?.category)
                    }}
                >
                    <p className='w-full'>{categories[activeFilters?.category]}</p>
                    <Image 
                        src={"/icons/xmark.webp"}
                        width={12}
                        height={12}
                        alt={"cross"}
                        priority
                    />
                
                </div>
            }
            {
                (!packageCategory && categories && Object.keys(categories)?.length > 0) ?

                <div className='flex flex-row gap-2 md:gap-6 2xl:justify-center w-full'>
                    {Object.keys(categories).map((cat,idx) => {
                        return(
                            cat !== activeFilters?.category &&
                            <div 
                                className={`filter-box  cursor-pointer w-full`} 
                                key={"category-"+idx}
                                onClick={()=>{
                                    handleChangeFilter("category",cat)
                                }}
                            >
                                <p className='w-full text-nowrap'>{categories[cat]}</p>
                            
                            </div>
                        )
                    })}
                </div>:""
            }
        </div>
    )
else
  return (

    <div className='grid grid-flow-row gap-4 md:gap-6 w-full  overflow-x-hidden'>
            {
                (packageCategory && categories && Object.keys(categories).length) ?
                    <div className='category-filter  w-full mx-auto  '>
                        {
                            Object.keys(categories).map((cat)=>{
                                return(
                                    <p key={`category-filter-${cat}`} 
                                        className={`flex justify-center cursor-pointer py-4 px-6 md:py-[22px]  items-center rounded-full w-full 
                                             font-semibold sub-title 
                                            ${activeFilters?.category === cat ? "active-filter-box text-color-primary border-[0px_1px_0px_0px] border-[#E3E5E5]":""}`}
                                        onClick={()=>{handleChangeFilter("category",cat)}}
                                    >
                                        {categories[cat]}
                                     
                                    </p>
                                )
                            })
                        }
                    </div>

                : ""
            }
            <div className='flex flex-col gap-2 md:flex-row items-center w-full  md:gap-4 justify-between py-2 px-4'>

                {
                    (!packageCategory && categories && Object.keys(categories)?.length > 0) ?
                    <div className='flex flex-wrap gap-2 md:gap-2 2xl:justify-center'>
                        {Object.keys(categories).map((cat,idx) => {
                            return(
                                <div 
                                    className={`filter-box   cursor-pointer ${cat === activeFilters?.category ? "active-filter-box":""}`} 
                                    key={"category-"+idx}
                                    onClick={()=>{
                                        handleChangeFilter("category",cat)
                                    }}
                                >
                                    <p>{categories[cat]}</p>
                                    {
                                        cat === activeFilters?.category?
                                        <Image 
                                            src={"/icons/xmark.webp"}
                                            width={12}
                                            height={12}
                                            alt={"cross"}
                                            priority
                                        />
                                        :""
                                    }
                                
                                </div>
                            )
                        })}
                    </div>:""
                }
                {
                    pricing?.length > 0 ?
                        <div className='flex flex-wrap gap-2 2xl:justify-center '>
                            {pricing.map((p,idx) => {
                                return(
                                    <div 
                                        className={`filter-box cursor-pointer  ${activeFilters?.pricing === idx ? "active-filter-box":""}`} 
                                        key={"price-"+idx}
                                        onClick={()=>{
                                            handleChangeFilter("pricing",idx)
                                        }}
                                    >
                                        <p>{!p?.max ? `₹ ${p.min} +` :`₹ ${p.min}-₹ ${p.max}`}</p>
                                        {
                                            activeFilters?.pricing === idx?
                                            <Image 
                                                src={"/icons/xmark.webp"}
                                                width={12}
                                                height={12}
                                                alt={"cross"}
                                                priority
                                                className='ms-[2px]'
                                            />
                                            :""
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    :""
                }
                {
                    displayNoOfPeople ?
                    <div className='flex flex-wrap gap-2  2xl:justify-center'>
                            {noOfPeople.map((nop,idx) => {
                                return(
                                    <div 
                                        className={`filter-box   cursor-pointer ${nop.value === activeFilters?.no_of_people ? "active-filter-box":""}`} 
                                        key={"no-of-people-"+idx}
                                        onClick={()=>{
                                            handleChangeFilter("no_of_people",nop.value)
                                        }}
                                    >
                                        <Image
                                            src={nop.img}
                                            width={nop.width}
                                            height={nop.height}
                                            alt={"people"}
                                            priority
                                            className='hidden sm:block'
                                        />
                                        <p>{nop?.label}</p>
                                        {
                                            nop.value === activeFilters?.no_of_people?
                                            <Image 
                                                src={"/icons/xmark.webp"}
                                                width={12}
                                                height={12}
                                                alt={"cross"}
                                                priority
                                                className='ms-[2px]'
                                            />
                                            :""
                                        }
                                    
                                    </div>
                                )
                            })}
                        </div>
                    :""
                }
            </div>
            
        
    </div>
  )
}

export default Filters