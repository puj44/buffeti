import Image from 'next/image'
import React from 'react'

function Banners() {
    const orderNow = () =>{
        var packageEle = document.getElementById("suggestive-package");
        var topPos = packageEle.offsetTop;
        window.scrollTo({top:topPos -10, behavior:"smooth"})
    }
  return (

        <div className='order-now-banner overflow-hidden'>
            <div className=' absolute left-[20px] md:left-[40px] top-[50%] translate-y-[-50%] z-10'>
                <div className='flex flex-col w-full gap-4 md:gap-8 convert-to-normal'>
                    <p className='font-medium max-w-[80%] 2sm:max-w-[100%] decorative-1 md:font-normal big-title'>{"A New way to Enjoy your catering food"}</p>
                    <div className='gap-8 flex flex-col'>
                        <p className='description hidden md:block  md:max-w-[55%] xl:max-w-[70%] text-color-charcoal'>{"Need some great food for a Birthday Party, House Party, Sales Call, Office Event, or Team Meeting?"}</p>
                        <div  className='btn primary-btn cursor-pointer big-btn-padding gap-3' 
                            onClick={()=>{ orderNow() }}>
                            <p className='font-medium'>
                                Order Now
                            </p>
                            <Image
                                src={"/arrows/r_arrow.webp"}
                                width={9}
                                height={14}
                                alt="arrow"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute right-0 md:-right-10 bottom-0 '>
                    <Image
                        src={"/banners/food_banner.webp"}
                        width={2303}
                        height={1321}
                        alt="arrow"
                        className='w-[132.56px] h-[71.89px] xs:w-[172.56px] xs:h-[91.89px] md:w-[425.69px] md:h-[230.25px] lg:w-[455.69px] lg:h-[250.25px] xl:w-[575.69px] xl:h-[330.25px]'
                        priority
                    />
            </div>
        </div>
  )
}

export default Banners