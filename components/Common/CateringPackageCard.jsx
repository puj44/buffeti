import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CateringPackageCard({pack,key}) {
  return (
    <div 
        className={`p-4  bg-[#F5F5F5] 
            grid grid-flow-row md:flex xl:flex-row md:flex-col gap-2 md:gap-4
            rounded-lg
            w-[280px] md:w-[349px]
            border-[1px solid #F5F5F5] md:border-0
        `} 
        key={"s-package-"+key}>
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
                <p className='sub-title font-medium '>{"₹"+pack.price}</p>
                <Link className=' btn transparent-orange-btn text-color-secondary w-[124px] shadow-[0px_4px_15px_0px_#00000008] ' href={pack.url ?? "/coming-soon"}>
                    Add
                </Link>
            </div>

        </div>
    </div>
  )
}

export default CateringPackageCard