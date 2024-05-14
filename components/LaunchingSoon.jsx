import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function LaunchingSoon() {
  return (
    <div className='page-spacing justify-center items-center gap-14 align-middle py-4'>
          <Image
                src={"/logo/logo_primary.webp"}
                alt="Buffeti"
                width={2049}
                height={1354}
                className="cursor-pointer"
                style={{width:"76.01px",height:"50px"}}
                priority
            />
        <div className='flex flex-col gap-1  '>
            <div className='flex flex-col gap-3 justify-center items-center'>
                <Image
                    src={"/coming_soon.webp"}
                    width={484}
                    height={302}
                    alt="Coming Soon"
                    priority
                />
                <p className='decorative-2 heading text-color-primary text-center'>Launching Soon</p>
            </div>
            <p className='page-title text-center'>We are coming soon at your place</p>
        </div>
        <div className='flex flex-col gap-4 justify-center items-center'>
            <h1 className='page-title font-semibold'>About Buffeti</h1>
            <p className='text-color-dark-gray product-title text-center '>
                {"At Buffeti, we believe that every gathering, big or small, deserves to be a culinary experience to remember. Frustrated by the complexities of traditional catering for smaller events, our journey began with a straightforward yet effective idea to use technology to simplify the catering process for gathering with guests ranging from 10 to 200. Our web based platform provides a vast array of menu selections to cater to every taste and occasion, ranging from gourmet dishes to comfort cuisine,and with just a few clicks, customers can place orders and coordinate deliveries, all from the convenience of their device."}
            </p>
        </div>
        <div className='footer flex flex-col gap-3 w-full items-center text-center'>
            <div className='flex flex-col gap-2 w-full '>
                <div className='items-center flex justify-center'>
                    <Image
                        src={"/logo/logo_primary.webp"}
                        alt="Buffeti"
                        width={103.39}
                        height={69}
                        className="cursor-pointer "
                        style={{width:"76.01px",height:"50px"}}
                        priority
                    />
                </div>
                <div className='border-[#E4E4E7] border-[1px] '></div>
            </div>
            <p className='text-color-light-gray items-center'>{"Copyright c 2024 Buffeti"}</p>
        </div>
    </div>
  )
}

export default LaunchingSoon