import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CateringPackageCard({pack,packageName}) {
  return (
    <div 
        className={`p-4 md:p-0 lg:p-0 2xl:p-4  bg-[#F5F5F5] md:bg-transparent
            grid grid-flow-row  gap-2 md:gap-4
            rounded-lg
            w-[280px] md:w-[349px]
            border-[1px] border-[#E3E5E5] md:border-0
        `} 
        key={"s-package-"+packageName}>
            <div>
                <Image
                    src={pack.activeImage.url}
                    width={pack.activeImage.width}
                    height={pack.activeImage.height}
                    alt={pack.name}
                    className=' rounded-md '
                />
            </div>
        <div className='flex flex-col gap-2'>
            <p className='package-title font-medium md:font-normal'>{pack.name}</p>
            <p className='text-color-dark-gray block '>{pack.description}</p>
            <div className='flex  flex-row justify-between w-full'>
                <p className='package-title my-auto font-medium '>{"₹"+pack.price}</p>
                <Link className=' btn transparent-orange-btn text-color-secondary w-[124px] shadow-[0px_4px_15px_0px_#00000008] ' href={`/suggestive-package/${packageName}`}>
                    Add
                </Link>
            </div>

        </div>
    </div>
  )
}

export default CateringPackageCard