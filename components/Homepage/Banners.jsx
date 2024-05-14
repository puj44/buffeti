import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Banners() {
  return (

        <div className='order-now-banner overflow-hidden'>
            <div className=' absolute left-[40px] top-[50%] translate-y-[-50%] z-10'>
                <div className='flex flex-col w-full gap-5'>
                    <p className='decorative-1 big-title'>{"A New way to Enjoy your catering food"}</p>
                    <div className='gap-8 flex flex-col'>
                        <p className='description max-w-[70%] md:max-w-[55%] text-color-charcoal'>{"Need some great food for a Birthday Party, House Party, Sales Call, Office Event, or Team Meeting?"}</p>
                        <Link href="coming-soon" className='btn primary-btn  big-btn-padding gap-3'>
                            <p>
                                Order Now
                            </p>
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
            <div className='absolute -right-10 bottom-0 '>
                    <Image
                        src={"/banners/food_banner.webp"}
                        width={2303}
                        height={1321}
                        alt="arrow"
                        style={{
                            width:"575.69px",
                            height:"330.25px"
                        }}
                        priority
                    />
            </div>
        </div>
  )
}

export default Banners