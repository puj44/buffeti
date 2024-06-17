import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import CustomiseOrderCard from './CustomiseOrderCard';
import CateringPackageCard from '../Common/CateringPackageCard';

function PackageSlider({packages, handleChangeCard, active, numberOfPeople}) {
  return (
    <div className='grid  gap-5 grid-flow-row max-w-full  lg:overflow-x-hidden'>
        
        {
            Object.keys(packages).map((p)=>{
                const pack = packages[p];
                return(<>
                    <div className='block w-full lg:hidden'>
                        <CateringPackageCard mobile={true} pack={pack} numberOfPeople={numberOfPeople} packageName={p}/>
                    </div>
                    <div className={`p-4 h-fit xl:pe-6 lg:p-2 ${active === p ?"bg-light-red":"bg-transparent"} 
                             hidden lg:flex  lg:flex-col xl:flex-row gap-4
                             rounded-lg
                             w-fit
                             border-[1px solid #FEE4E2]
                             cursor-pointer`}
                            key={"s-package-"+p}
                            onClick={()=>{handleChangeCard(p)}}
                             >
                                 <div className=''>
                            <Image
                                src={"/packages/dummy_pack.webp"}
                                width={102}
                                height={106}
                                alt={pack.package_name}
                                className=' rounded-md '
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='package-title font-medium md:font-normal'>{pack.package_name}</p>
                            <p className='text-color-dark-gray '>{(pack.items_mapping?.length) +" Items"}</p>
                            <p className='sub-title font-medium '>{"₹"+pack[`_${numberOfPeople}_pax`]}</p>

                        </div>
                    </div>
                </>
                )
            })
        }
        {/* <div className='block lg:hidden'>
          <CustomiseOrderCard mobile={true} />
        </div> */}
     
    </div>
  )
}

export default PackageSlider