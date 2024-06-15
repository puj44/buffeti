import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function PackageCard({data,slug, numberOfPeople}) {
  return (
    <div className='p-4  lg:p-0 pt-12  grid grid-flow-row gap-4 max-w-[359px]'>
      <div className='w-[359px] h-[166px]'>
        <Image
          src={"/catering_services/mini_thali.webp"}
          width={359}
          height={166}
          style={{
            height:"100%"
          }}
          alt={data.package_name}
        />
      </div>
      <div className='grid grid-flow-row gap-2'>
        <p className='product-title font-medium'>{data.package_name}</p>
        <p className='text-color-primary-gray '>{data.categories_description}</p>
        <div className='flex flex-row justify-between items-center'>
          <p className='sub-title font-medium '>{"₹"+data[`_${numberOfPeople}_pax`]}</p>
          <Link href={`/suggestive-package/${slug}`} className='btn primary-btn flex flex-row gap-3'>
            <p className='font-medium'>Select</p>
              <Image
                  src={"/arrows/r_arrow.webp"}
                  width={9}
                  height={14}
                  alt="arrow"
              />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PackageCard