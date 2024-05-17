import Image from 'next/image'
import React from 'react'

function notFound() {
  return (
    <div className='page-spacing justify-center items-center gap-8 align-middle py-14'>
          {/* <Image
                src={"/logo/logo_primary.webp"}
                alt="Buffeti"
                width={2049}
                height={1354}
                className="cursor-pointer"
                style={{width:"103.39px",height:"69px"}}
                priority
            /> */}
        <div className='flex flex-col gap-1  '>
            <div className='flex flex-col gap-2 justify-center items-center'>
                <Image
                    src={"/coming_soon.webp"}
                    width={484}
                    height={302}
                    alt="Coming Soon"
                    priority
                />
                <p className='decorative-2 heading text-color-primary text-center'>404</p>
            </div>
            <p className='page-title text-center'>Page not found</p>
        </div>
    </div>
  )
}

export default notFound