import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CustomiseOrderCard({mobile}) {
  return (
    <div className={` h-[168px] md:h-[180px] lg:w-[381px] lg:h-[466px] flex  rounded-lg `}
    style={{
        backgroundImage:`url(${mobile?"/banners/primary_card_row.webp":"/banners/primary_card.webp"})`,
        backgroundSize:`${mobile ? "1184px 180px" :"100% 466px"}`
    }}
    >
        <div className=
            {`p-4 flex 
              md:flex-row md:justify-center   md:w-full
            lg:items-baseline
            `}>
            <div 
                className={`
                    flex flex-col gap-2 items-start 
                    md:flex-row md:justify-between md:items-center 
                    lg:flex-col lg:items-start lg:h-full
                `}
            >

                <div className='grid grid-flow-row gap-3 w-fit'>
                    <p className='text-color-offwhite hidden lg:block card-heading'>Or</p>
                    <div className='md:flex w-fit flex flex-wrap gap-0.5 sm:gap-2 lg:grid-flow-row card-heading lg:gap-0 font-medium md:font-bold'>
                        <p className='text-color-offwhite w-fit'>{"Create your"}</p>
                        <p className='text-color-white w-fit'>{"Own Package"}</p>
                    </div>
                    <div className='hidden product-title text-color-white lg:flex flex-col  leading-8'>
                        <p >{"Did not find what you were looking?"}</p>
                        <p >{"Call us to Create your own package"}</p>
                    </div>
                    <div className='flex  sm:max-w-[100%] product-title lg:hidden leading-5 text-color-white w-fit'>
                        {"Order what you like from our menu. You decide the menu we deliver it."}
                    </div>
                </div>
                {/* BUTTON */}
                <div className='w-fit'>
                    <Link className='btn secondary-btn max-w-[220px] lg:max-w-[245px] lg:mb-8  font-medium' style={{padding:"12px 14px"}}  href="/coming-soon">
                        Create Customised Order
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CustomiseOrderCard