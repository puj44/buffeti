import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function LaunchingSoon() {
  return (
    <div className='page-spacing justify-center items-center gap-8 align-middle py-2'>
        <div className=' flex w-full justify-center pb-2' style={{boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.0313)"}}>
            <Image
                    src={"/logo/logo_primary.webp"}
                    alt="Buffeti"
                    width={2049}
                    height={1354}
                    className="cursor-pointer w-[83.18px] h-[53px] md:w-[80px] md:h-[55px]"
                    // style={{width:"103.39px",height:"69px"}}
                    priority
                />
        </div>
        <div className='grid grid-flow-row lg:grid-cols-2 gap-6 lg:gap-3 xl:gap-0 lg:pt-8'>
            <div className='flex flex-col gap-1  justify-center '>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <Image
                        src={"/coming_soon.webp"}
                        width={484}
                        height={302}
                        alt="Coming Soon"
                        className='w-[280px] h-[174.4] lg:w-[484px] lg:h-[302px]'
                        priority
                    />
                    <p className='open-sans font-bold heading text-color-primary text-center'>Launching Soon</p>
                </div>
                <p className='page-title text-center'>We are coming soon at your place</p>
            </div>
            <div className='flex justify-center'>
                <div className='flex flex-col gap-4 justify-center items-center'>
                    <h1 className='page-title font-semibold'>About Buffeti</h1>
                    <p className='text-color-dark-gray product-title text-center '>
                        {"At Buffeti, we believe that every gathering, big or small, deserves to be a culinary experience to remember. Frustrated by the complexities of traditional catering for smaller events, our journey began with a straightforward yet effective idea to use technology to simplify the catering process for gathering with guests ranging from 10 to 200. Our web based platform provides a vast array of menu selections to cater to every taste and occasion, ranging from gourmet dishes to comfort cuisine,and with just a few clicks, customers can place orders and coordinate deliveries, all from the convenience of their device."}
                    </p>
                </div>
            </div>
        </div>
        <div className='footer flex flex-col gap-3 w-full items-center text-center 2xl:absolute bottom-0 left-0 right-0'>
            <div className='flex flex-col gap-2 w-full '>
                <div className='items-center flex justify-center'>
                    <Image
                        src={"/logo/logo_primary.webp"}
                        alt="Buffeti"
                        width={2049}
                        height={1354}
                        className="cursor-pointer w-[88.18px] h-[58px] md:w-[103.39px] md:h-[69px]"
                        priority
                    />
                </div>
                <div className='border-[#E4E4E7] border-[1px] '></div>
            </div>
            <p className='text-color-light-gray items-center'>{"Copyright © 2024 Buffeti"}</p>
        </div>
    </div>
  )
}

export default LaunchingSoon