import Image from 'next/image'
import React from 'react'
import navbar from '@/json/navbar.json';
import socials from '@/json/social_links.json';
import Link from 'next/link';

function Footer() {
  return (
    <div className='page-spacing'>
        <div className='footer'>
            <div className='flex flex-col gap-6 md:gap-3'>
                <div className='flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between w-full'>
                    <div className=' flex flex-col gap-2'>          
                        <Link className='flex flex-row gap-2  items-center ' href="/">
                            <Image
                                src={"/logo/logo_primary.webp"}
                                alt={"signin"}
                                width={90}
                                height={60}
                                className='my-auto w-[88px] h-[58px] md:w-[90px] md:h-[60px]'
                                loading='lazy'
                            />
                            <p className='text-color-primary page-title hidden md:block decorative-1'>Buffeti</p>
                        </Link>
                        <p className='text-color-light-gray  block md:hidden'>{"Copyright c 2024 Buffeti"}</p>
                    </div>
                    <div className='flex flex-col md:flex-row gap-4 md:gap-6 md:items-center'>
                            {
                                navbar.map((nv,idx)=>{
                                    return(
                                        idx !== (navbar.length -1) &&
                                        <Link href={nv.url} key={"menu-"+idx}>{nv.title}</Link>
                                    )
                                })
                            }
                    </div>
                </div>
                <div className='border-[#E4E4E7] border-[1px] hidden md:block '></div>
                <div className='flex md:justify-between w-full'>
                    <p className='text-color-light-gray items-center hidden md:block'>{"Copyright c 2024 Buffeti"}</p>
                    <div className='flex flex-row gap-6 items-center'>
                            {socials.map((s,idx)=>{
                                return(
                                    <Link href={s.url} key={"social-"+s.title}>
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
            </div>

        </div>
    </div>
  )
}

export default Footer