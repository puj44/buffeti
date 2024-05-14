import Image from 'next/image'
import React from 'react'
import navbar from '@/json/navbar.json';
import socials from '@/json/social_links.json';
import Link from 'next/link';

function Footer() {
  return (
    <div className='page-spacing'>
        <div className='footer'>
            <div className='flex flex-col gap-3'>
                <div className='flex justify-between w-full'>
                    <Link className='flex flex-col gap-2 items-center' href="/">
                        <Image
                            src={"/logo/logo_primary.webp"}
                            alt={"signin"}
                            width={76}
                            height={50}
                            className='my-auto'
                            sizes="100vw"
                            loading='lazy'
                        />
                        <p className='text-color-primary decorative-1'>Buffeti</p>
                    </Link>
                    <div className='flex flex-row gap-6 items-center'>
                            {
                                navbar.map((nv,idx)=>{
                                    return(
                                        idx !== (navbar.length -1) &&
                                        <Link href={nv.url} >{nv.title}</Link>
                                    )
                                })
                            }
                    </div>
                </div>
                <div className='border-[#E4E4E7] border-[1px] '></div>
                <div className='flex justify-between w-full'>
                    <p className='text-color-light-gray items-center'>{"Copyright c 2024 Buffeti"}</p>
                    <div className='flex flex-row gap-6 items-center'>
                            {socials.map((s,idx)=>{
                                return(
                                    <Image
                                        src={s.img}
                                        width={s.width}
                                        height={s.height}
                                        alt={s.title}
                                        key={"social-"+s.title}
                                    />
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