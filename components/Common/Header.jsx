import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  
  return (
    <div className='page-spacing'>
        <div id="navbar" className='navbar flex justify-between '>
            <div className='w-[76.01px] h-[50px]'>
                <Link href="/">
                    <Image
                        src={"/logo/logo_primary.webp"}
                        alt="Buffeti"
                        width={2049}
                        height={1354}
                        className="cursor-pointer"
                        style={{width:"100%",height:"100%"}}
                        priority
                    />
                </Link>
            </div>
            <div className='flex flex-row h-fit gap-7 my-auto'>
                <Link href="/" className='flex flex-row gap-3 align-middle my-auto'>
                    {/* <div className='w-[17px] h-[17px] my-auto'> */}
                        <Image
                            src="/icons/home.png"
                            alt="home"
                            width={16}
                            height={18}
                            style={{
                                width:"100%",
                                height:"100%"
                            }}
                            className='my-auto'
                        />
                    {/* </div> */}
                    <h4 className='my-auto'>
                        {"Home"}
                    </h4>
                </Link>
                <Link href="/about" className='flex flex-row gap-3 my-auto'>
                        <Image
                            src="/icons/about.png"
                            alt="about"
                            width={19}
                            height={19}
                            style={{
                                width:"100%",
                                height:"100%"
                            }}
                            className='my-auto'
                        />
                    <h4 className='my-auto'>
                        {"About"}
                    </h4>
                </Link>
                <Link href="/meal-boxes" className='flex flex-row gap-3 align-middle my-auto'>
                        <Image
                            src="/icons/meal_boxes.png"
                            alt="meal_boxes"
                            width={18}
                            height={18}
                            className='my-auto'
                        />
                    <h4 className='my-auto'>
                        {"Meal Boxes"}
                    </h4>
                </Link>
                <Link href="/orders" className='flex flex-row gap-3 align-middle my-auto'>
                        <Image
                            src="/icons/orders.png"
                            alt="orders"
                            width={15}
                            height={19}
                            style={{
                                width:"100%",
                                height:"100%"
                            }}
                            className='my-auto'
                        />
                    <h4 className='my-auto'>
                        {"Orders"}
                    </h4>
                </Link>
                <Link href="/custom-package" className='my-auto'>
                    <div className='btn primary-btn gap-2'>
                           <Image
                                src="/icons/plus_white.png"
                                alt="home"
                                width={14}
                                height={14}
                                className='my-auto'
                           />
                           <h4>{"Custom Package"}</h4>
                    </div>
                </Link>
                <Link href="/sign-in" className='flex flex-row gap-3 align-middle my-auto'>
                        <Image
                            src="/icons/profile.png"
                            alt="profile"
                            width={16}
                            height={16}
                            className='my-auto'
                        />
                    <h4 className='my-auto'>
                        {"Sign in"}
                    </h4>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Header