import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CustomiseOrderCard({mobile}) {
  return (
    <div className={` flex flex-row p-4 w-full relative justify-between bg-primary overflow-hidden rounded-lg `}
    >   
        <div className='absolute  left-[16px] top-[-100%] translate-y-[-5%]  w-[333.25px] h-[293px]'>
            <Image
                src={"/banners/red_banner_bg.webp"}
                width={1239}
                height={1020}
                alt=""
                priority
            />
        </div>
        <p className='font-bold card-heading text-white'>{"Create your Own Package"}</p>
        <Link href="/customise-package" className='btn bg-white '>
            <p className='text-color-primary font-bold'>{"Create Package"}</p>
            <Image
                src={"/arrows/red_r_arrow.webp"}
                width={8}
                height={14}
                alt={"arrow"}
                priority
            />
        </Link>
    </div>
  )
}

export default CustomiseOrderCard