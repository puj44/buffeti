import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function PackageCard({data,slug}) {
  return (
    <div className='p-4 pt-12  grid grid-flow-row gap-4 max-w-[381px]'>
      <div>
        <Image
          src={data.activeImage.url}
          width={data.activeImage.width}
          height={data.activeImage.height}
          alt={data.activeImage.name}
        />
      </div>
      <div className='grid grid-flow-row gap-2'>
        <p className='product-title font-medium'>{data.name}</p>
        <p className='text-color-primary-gray '>{data.description}</p>
        <div className='flex flex-row justify-between items-center'>
          <p className='sub-title font-medium '>{"₹"+data.price}</p>
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