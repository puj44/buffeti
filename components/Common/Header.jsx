import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import navbar from '@/json/navbar.json';
import { useRouter } from 'next/router';
import { store } from '@/redux/store';
import { useSelector } from 'react-redux';
function Header({handleModelClick}) {
    const router = useRouter();
    const auth = useSelector((state)=>state.auth)
    const isPathActive = (url) =>{
        if(url === ""){
            if(router.asPath === "/"){
                return true;
            }
        }else{
            if(router.asPath.includes(url))  return true;
        }
        return false;
    }
    useEffect(()=>{

    },[auth,auth?.isAuthenticated])
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
            <div className='flex flex-row gap-5 xl:gap-7'>

                <div className='hidden md:flex flex-row h-fit gap-5 xl:gap-7 my-auto'>
                    {
                        navbar.map((n,idx)=>{
                            return(
                            
                                <Link key={"navbar-"+idx} href={"/"+(n.url)} className={` flex flex-row gap-2 xl:gap-3 align-middle my-auto ${n.className ?? ""}`}>
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
                                    <h4 className={`${ isPathActive(n.url) ?"text-color-primary font-medium":""} my-auto`}>
                                        {n.title}
                                    </h4>
                                </Link>
                            )
                        })
                    }
                <div onClick={()=>{!(auth?.isAuthenticated) && handleModelClick(true)}} className={`${auth?.isAuthenticated ? "hidden":""} cursor-pointer flex flex-row gap-2 xl:gap-3 align-middle my-auto`}>

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
                    </div>
                </div>
                <div onClick={()=>{ !(auth?.isAuthenticated) && handleModelClick(true)}} className={`flex ${auth?.isAuthenticated ? "":"md:hidden"} justify-center gray-circle w-[38px] h-[38px] items-center align-middle my-auto`}>

                    <Image
                        src={"/icons/profile_mobile.webp"}
                        alt={"profile"}
                        width={16}
                        height={16}
                        // style={{
                        //     height:"100%",
                        //     width:"100%"
                        // }}
                        className='my-auto'
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
export default Header