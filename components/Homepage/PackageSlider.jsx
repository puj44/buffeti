import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import CustomiseOrderCard from './CustomiseOrderCard';
import CateringPackageCard from '../Common/CateringPackageCard';

function PackageSlider({packages, handleChangeCard, active}) {
  return (
    <div className='grid grid-flow-col gap-5 lg:grid-flow-row max-w-full overflow-x-scroll overflow-y-hidden lg:overflow-x-hidden'>
        <p className='hidden lg:block font-medium product-title'>Select Your Package</p>
        {
            Object.keys(packages).map((p)=>{
                const pack = packages[p];
                return(<>
                    <div className='block lg:hidden'>
                        <CateringPackageCard pack={pack} key={p}/>
                    </div>
                    <div className={`p-4 xl:pe-6 lg:p-2 ${active === p ?"bg-light-red":"bg-transparent"} 
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
                                src={pack.img}
                                width={pack.width}
                                height={pack.height}
                                alt={pack.name}
                                className=' rounded-md '
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='package-title font-medium md:font-normal'>{pack.name}</p>
                            <p className='text-color-dark-gray '>{pack.items+" Items"}</p>
                            <p className='sub-title font-medium '>{"₹"+pack.price}</p>

                        </div>
                    </div>
                </>

                    // <div 
                    //     className={`p-4 xl:pe-6 md:p-2 ${active === p ?"md:bg-light-red":"md:bg-transparent"} bg-[#F5F5F5] 
                    //         grid grid-flow-row md:flex xl:flex-row md:flex-col gap-2 md:gap-4
                    //         rounded-lg
                    //         w-[280px] md:w-fit
                    //         border-[1px solid #F5F5F5] md:border-[1px solid #FEE4E2]
                    //         ${active === p ? "":"md:cursor-pointer"}
                    //     `} 
                    //     onClick={()=>{handleChangeCard(p)}}
                    //     key={"s-package-"+p}>
                    //     <div className='hidden md:block'>
                    //         <Image
                    //             src={pack.img}
                    //             width={pack.width}
                    //             height={pack.height}
                    //             alt={pack.name}
                    //             className=' rounded-md '
                    //         />
                    //     </div>
                    //     <div className='block md:hidden'>
                    //         <Image
                    //             src={pack.activeImage.url}
                    //             width={pack.activeImage.width}
                    //             height={pack.activeImage.height}
                    //             alt={pack.activeImage.name}
                    //             className=' rounded-md '
                    //         />
                    //     </div>
                    //     <div className='flex flex-col gap-2'>
                    //         <p className='package-title font-medium md:font-normal'>{pack.name}</p>
                    //         <p className='text-color-dark-gray hidden md:block'>{pack.items+" Items"}</p>
                    //         <p className='text-color-dark-gray block md:hidden'>{pack.description}</p>
                    //         <div className='flex md:block flex-row justify-between w-full'>
                    //             <p className='sub-title font-medium '>{"₹"+pack.price}</p>
                    //             <Link className='md:hidden btn transparent-orange-btn text-color-secondary w-[124px] shadow-[0px_4px_15px_0px_#00000008] ' href={pack.url ?? "/coming-soon"}>
                    //                 Add
                    //             </Link>
                    //         </div>

                    //     </div>
                    // </div>
                )
            })
        }
        <div className='block lg:hidden'>
          <CustomiseOrderCard mobile={true} />
        </div>
    </div>
  )
}

export default PackageSlider