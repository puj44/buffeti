import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ComingSoon() {
  return (
    <div className='page-spacing justify-center items-center align-middle py-20'>
        <div className='flex flex-col gap-6  '>
            <div className='flex flex-col gap-3 justify-center items-center'>
                <Image
                    src={"/coming_soon.webp"}
                    width={484}
                    height={302}
                    alt="Coming Soon"
                />
                <p className='decorative-2 heading text-color-primary'>Coming Soon</p>
            </div>
            <div className='flex flex-col gap-4 justify-center items-center'>
                <p className='page-title'>This page is under construction</p>
                <Link href="/" className='btn primary-btn w-fit'>
                    Go back to Home
                </Link>
            </div>
        </div>
    </div>
  )
}

export default ComingSoon