import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CustomiseOrderCard({mobile}) {
  return (
    <div className='relative w-[280px]  lg:w-[381px] lg:h-[482px] flex justify-end '>
        <Image
            src={"/banners/primary_card.webp"}
            width={1524}
            height={1928}
            alt={"card"}
        />
        <div className='absolute left-4 top-4 grid grid-flow-rows gap-8 lg:gap-0 lg:grid-rows-[75%_25%] h-fit lg:h-full '>
            {/* TEXT */}
            <div className='flex flex-col gap-2 lg:gap-3'>
                <p className='text-color-offwhite card-heading'>Or</p>
                <div className='font-semibold hidden lg:flex flex-col '>
                    <p className='text-color-offwhite card-heading leading-9'>Create your</p>
                    <p className='text-color-white card-heading'>Own Package</p>
                </div>
                <div className='font-medium flex lg:hidden flex-col '>
                    <p className='text-color-offwhite card-heading '>Create your Own</p>
                    <p className='text-color-white card-heading'>Package</p>
                </div>
                <div className=' flex flex-col font-light  max-w-[300px]  '>
                    <p className='text-color-white product-title lg:leading-8'>Did not find what you were looking?</p>
                    <p className='text-color-white product-title lg:leading-8'>Call us to Create your own package</p>
                </div>
            </div>
            {/* BUTTON */}
            <div>
                <Link className='btn secondary-btn max-w-[220px] lg:max-w-[245px]  font-semibold lg:font-medium' style={{padding:"14px"}}  href="/coming-soon">
                    Create Customised Order
                </Link>
            </div>
        </div>
    </div>
  )
}

export default CustomiseOrderCard