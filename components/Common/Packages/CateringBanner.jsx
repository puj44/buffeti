import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CateringBanner() {
  return (
    <div className={`max-h-[170px]  flex  rounded-lg `}
    style={{
        backgroundImage:`url("/banners/primary_card_row.webp")`,
        backgroundSize:`${ "1184px 180px" }`
    }}
    >
        <div className=
            {`p-4 lg:p-14 flex w-full
            `}>
            <div 
                className={`
                    flex flex-col md:flex-row md:items-center justify-between  w-full gap-2
                `}
            >

                <div className='grid grid-flow-row gap-2 w-fit'>
                    <div className='md:flex w-fit flex flex-wrap gap-0.5 sm:gap-2 md:grid-flow-row card-heading font-medium md:font-bold'>
                        <p className='text-color-offwhite w-fit'>{"Create your"}</p>
                        <p className='text-color-white w-fit'>{"Own Package"}</p>
                    </div>
                    <div className='flex  sm:max-w-[100%] description-title  leading-5 text-color-white w-fit'>
                        {"Order what you like from our menu. You decide the menu we deliver it."}
                    </div>
                </div>
                {/* BUTTON */}
                <div className='w-fit'>
                    <Link className='btn secondary-btn max-w-[220px] lg:max-w-[245px]  font-medium' style={{padding:"12px 14px"}}  href="/coming-soon">
                        Create Customised Order
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CateringBanner