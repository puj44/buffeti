import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CateringPackageCard({pack,packageName,numberOfPeople}) {
  return (
    <div 
        className={`p-0 lg:p-0 2xl:p-4  lg:bg-[#F5F5F5] md:bg-transparent
            flex flex-row w-full lg:grid-flow-row  gap-2 md:gap-4
            rounded-md 
        `} 
        key={"s-package-"+packageName}>
            <div className='w-max flex  h-[100px]'>
                <Image
                    src={"/catering_services/mini_thali.webp"}
                    width={100}
                    height={100}
                    alt={pack.package_name}
                    style={{
                        width:"100%",
                        height:"100%"
                    }}
                    className=' rounded-md '
                />
            </div>
        <div className='flex flex-col gap-1 justify-between w-full'>
            <div className='flex flex-col'> 

                <p className='package-title font-medium md:font-normal'>{pack.package_name}</p>
                <p className='text-color-dark-gray block '>{pack.categories_description}</p>
            </div>
            <div className='flex  flex-row justify-between w-full'>
                <p className='package-title my-auto font-medium '>{"₹"+pack[`_${numberOfPeople}_pax`]}</p>
                <Link className=' btn transparent-orange-btn text-color-secondary w-[80px] sm:w-[124px] shadow-[0px_4px_15px_0px_#00000008] ' href={`/suggestive-package/${packageName}`}>
                    Add
                </Link>
            </div>

        </div>
    </div>
  )
}

export default CateringPackageCard