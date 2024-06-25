import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CustomiseOrderCard({mobile}) {
  return (
    <div className={` flex flex-col gap-3 md:gap-2 md:flex-row p-4 w-full items-center relative justify-between bg-[#FEE4E2] border-[1px] border-[#B42318] overflow-hidden rounded-lg `}
    >   
        <div className='absolute  left-[16px] top-[-100%] translate-y-[-5%]  w-[333.25px] h-[293px]'>
            <Image
                src={"/banners/white_banner_bg.webp"}
                width={1333}
                height={1172}
                alt=""
                priority
            />
        </div>
        <p className='font-bold card-heading text-color-primary z-10'>{"Create your Own Package"}</p>
        <Link href="/customise-package" className='btn primary-btn z-10 max-w-[182px] self-end md:self-center'>
            <p className='text-white font-bold'>{"Create Package"}</p>
            <Image
                src={"/arrows/r_arrow.webp"}
                width={8}
                height={12}
                alt={"arrow"}
                priority
            />
        </Link>
    </div>
  )
}

export default CustomiseOrderCard