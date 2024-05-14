import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import navbar from '@/json/navbar.json';
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
            <div className='flex flex-row h-fit gap-5 xl:gap-7 my-auto'>
                {
                    navbar.map((n,idx)=>{
                        return(
                          
                            <Link key={"navbar-"+idx} href={n.url} className={` flex flex-row gap-2 xl:gap-3 align-middle my-auto ${n.className ?? ""}`}>

                                  <Image
                                        src={n.img}
                                        alt={n.title}
                                        width={n.width}
                                        height={n.height}
                                        // style={{
                                        //     height:"100%",
                                        //     width:"100%"
                                        // }}
                                        className='my-auto'
                                        sizes="100vw"
                                        loading='lazy'
                                    />
                                <h4 className='my-auto'>
                                    {n.title}
                                </h4>
                            </Link>
                        )
                    })
                }
               <Link  href={"coming-soon"} className={` flex flex-row gap-2 xl:gap-3 align-middle my-auto`}>

                    <Image
                        src={"/icons/profile.webp"}
                        alt={"signin"}
                        width={16}
                        height={16}
                        // style={{
                        //     height:"100%",
                        //     width:"100%"
                        // }}
                        className='my-auto'
                    />
                    <h4 className='my-auto'>
                        {"Sign In"}
                    </h4>
                </Link>
            </div>
        </div>
    </div>
  )
}
export default Header