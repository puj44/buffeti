import Image from 'next/image'
import React from 'react'

function ExtraServices({
    data,
    handleChangeExtraService,
    selectedData
}) {
  return (
    <div 
        className='relative min-h-[194px] text-white h-fit overflow-hidden bg-primary flex flex-col p-4 gap-4 rounded-lg '
        style={{
            backgroundImage:"url('/banners/services.webp')",
            backgroundSize:"135.73px 127.95px",
            backgroundRepeat:"no-repeat",
            backgroundPositionX:"100%",
            backgroundPositionY:"100%"
        }}
    >
        {/* <div className=' absolute right-[-1px] bottom-[-1px] z-0'>
            <Image
                src={"/banners/services.webp"}
                width={135.73}
                height={127.95}
                priority
                alt=''
            />
        </div> */}
        <p className='sub-title font-normal'>{"Add Extra Services"}</p>
        <div className='grid grid-flow-row gap-5 items-center  w-full '>
            {
                data?.length > 0 && 
                data.map((service,idx)=>{
                    return(
                        <div key={service.slug} className='flex flex-row w-full items-center justify-between gap-2'>
                            <div className='flex flex-row gap-2 items-center w-full'>
                                <span 
                                    className={`border-[1px] border-[#fff] cursor-pointer rounded-sm w-[22px] h-[22px] flex justify-center items-center`}
                                    onClick={()=>{handleChangeExtraService(service.slug)}}
                                >
                                    {
                                        selectedData?.includes(service.slug) &&
                                        <Image
                                            src={"/icons/tickmark.webp"}
                                            width={12}
                                            height={12}
                                            priority
                                            alt="+"
                                        />
                                    }
                                </span>
                                <p className=''>{service.name}</p>
                            </div>
                            <p className='text-nowrap'> {"₹ "+service.price}</p>
                        </div>
                    )
                })
            }
        </div>
       
    </div>
  )
}

export default ExtraServices