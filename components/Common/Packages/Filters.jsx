import Image from 'next/image'
import React from 'react'
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
function Filters({
    pricing, 
    displayNoOfPeople,
    activeFilters,
    handleChangeFilter,
    packageCategory,
    categories,
}) {
    
  return (
    <div className='flex flex-col gap-2 2xl:justify-center'>
       
            {
                pricing?.length > 0 ?
                    <div className='flex flex-wrap gap-4 2xl:justify-center md:gap-6'>
                        {pricing.map((p,idx) => {
                            return(
                                <div 
                                    className={`filter-box cursor-pointer ${activeFilters?.pricing === idx ? "active-filter-box":""}`} 
                                    key={"price-"+idx}
                                    onClick={()=>{
                                        handleChangeFilter("pricing",idx)
                                    }}
                                >
                                    <p>{!p?.max ? `₹ ${p.min} +` :`₹ ${p.min}-₹ ${p.max}`}</p>
                                </div>
                            )
                        })}
                    </div>
                :""
            }
            {
                displayNoOfPeople ?
                <div className='flex flex-wrap gap-4 md:gap-6 2xl:justify-center'>
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
                                </div>
                            )
                        })}
                    </div>
                :""
            }
            {
                (packageCategory && categories && Object.keys(categories).length) ?
                    <div className='category-filter overflow-hidden mt-4 max-w-[1120px]'>
                        {
                            Object.keys(categories).map((cat)=>{
                                return(
                                    <p key={`category-filter-${cat}`} 
                                        className={`flex justify-center cursor-pointer py-3 items-center w-full ${activeFilters?.category === cat ? "active-filter-box":""}`}
                                        onClick={()=>{handleChangeFilter("category",cat)}}
                                    >
                                        {categories[cat]}
                                    </p>
                                )
                            })
                        }
                    </div>
                :""
            }
        
    </div>
  )
}

export default Filters