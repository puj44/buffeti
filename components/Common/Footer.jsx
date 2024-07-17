import Image from 'next/image'
import React from 'react'
import navbar from '@/json/footer.json';
import socials from '@/json/social_links.json';
import Link from 'next/link';

function Footer() {
  return (
    <div className='page-spacing pt-16 pb-8'>
        <div className='flex flex-col gap-6 md:gap-16'>
            <div className='flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between w-full'>
                <div className=' grid grid-flow-row md:grid-flow-col md:justify-between gap-2'>  
                    <div className='grid grid-flow-row gap-8 justify-center md:justify-normal'>
                        <Link href="/" className='mx-auto md:mx-0'>
                            <Image
                                src={`/logo/primary_red.webp`}
                                alt={"signin"}
                                width={568}
                                height={293}
                                className='my-auto w-[142px] h-[93px] md:w-[142px] md:h-[73px]'
                                loading='lazy'
                            />
                        </Link>
                        <div className='grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-8  md:items-center'>
                            {
                                navbar.map((nv,idx)=>{
                                    
                                    return(
                                        !(nv.isDropdown) &&
                                        <Link href={nv.url} className='font-semibold mx-auto md:mx-0' key={"menu-"+idx}>{nv.title}</Link>
                                    )
                                })
                            }
                        </div>
                    </div>        
                </div>
                
            </div>
            {/* <div className='grid grid-flow-row gap-8 '> */}
                {/* <div className='border-[#595959] border-[0.5px] h-[0.5px] hidden md:block '></div> */}
                <div className='flex flex-col text-color-dark-gray md:flex-row md:justify-between w-full lg:px-8 items-center  pt-8' style={{borderTopWidth:"1px",borderTopColor:"#595959"}}>
                    <p className=' items-center hidden md:block'>{"© 2024 Buffeti. All rights reserved."}</p>
                    <div className='grid grid-cols-3 md:flex md:flex-row gap-4 md:gap-6 items-center justify-center'>
                            <Link href="/terms-and-conditions" className=' items-center'>Terms</Link>
                            <Link href="/privacy-policy" className=' items-center'>Privacy</Link>
                            <Link href="/cookies-policy" className=' items-center'>Cookies</Link>
                            <Link href="/cancellation-refund-policy" className=' items-center'>Cancellation & Refund Policy</Link>
                            {socials.map((s,idx)=>{
                                return(
                                    <Link href={s.url} key={"social-"+s.title} className='m-auto'>
                                        <Image
                                            src={s.img}
                                            width={s.width}
                                            height={s.height}
                                            alt={s.title}
                                    
                                        />
                                    </Link>
                                )
                            })}
                    </div>
                </div>
            {/* </div> */}
        </div>

    </div>
  )
}

export default Footer