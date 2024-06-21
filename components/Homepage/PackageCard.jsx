import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function PackageCard({data,numberOfPeople, menuOption}) {
  return (
    <div className='package-card relative max-w-[372px] flex flex-col gap-4 h-full'>
       <div className='px-4  mx-auto'>
        <Image
          src={"/catering_services/mini_thali.webp"}
          width={340}
          height={166}
          style={{
            width:"100%",
            height:"100%"
          }}
          alt={data?.slug}
          priority
        />
      </div>
      <div className='px-4'>

        <h4 className='font-medium package-title'>{data?.package_name}</h4>
        <h5 className='text-color-primary-gray '>{menuOption === "mini-meals" ?data?.description :data?.items_description ?? data?.categories_description}</h5>
      </div>
      <div className='h-full items-end flex'>
        <Link href={`/customise-package/${data?.slug}`} className='weird-btn primary-btn items-end h-fit'>
            <p className='font-bold md:font-extrabold sub-title'>₹ { menuOption === "mini-meals" ?data?.price :data?.[("_"+numberOfPeople+"_pax")]}</p>
            <span className='w-[64px] h-[48px] flex justify-center items-center bg-white py-4 px-6 rounded-[45px]'>

              <Image
                src={"/arrows/red_r_arrow.webp"}
                width={8}
                height={14}
                alt={"arrow"}
                priority
              />
            </span>
        </Link>
      </div>
    </div>
  )
}

export default PackageCard