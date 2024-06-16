import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function SnackboxCard() {
  return (
    <div className='rounded-lg bg-primary p-3 w-full overflow-hidden min-h-[266px] sm:p-7 relative'>
      <div className='absolute bottom-[-30px] right-[-30px] '>
        <Image
          src={"/banners/snack_box_card.webp"}
          width={228}
          height={250}
          alt="Snackbox"
        />
      </div>
      <div className='flex flex-col gap-4 '>
          <div className='flex flex-col gap-2 sm:gap-0'>
            <div className='flex flex-col gap-0'>

              <p className='text-color-offwhite w-fit font-medium md:font-bold card-heading'>{"Create your"}</p>
              <p className='text-white w-fit font-medium md:font-bold card-heading'>{"Own Snackbox"}</p>
            </div>
            <p className='small-title text-white max-w-[60%] sm:max-w-[100%]'>{"Create a snack box of your own choice"}</p>
          </div>
          <Link href={"/packages/snack-boxes"} className='flex text-white items-center flex-row gap-2'>
            <p className='flex'>View</p>
            <div className='flex'>

              <Image
                src={"/arrows/r_arrow.webp"}
                width={9}
                height={14}
                style={{
                  width:"100%",
                  height:"100%"
                }}
                alt={"arrow"}
                priority
              />
            </div>
          </Link>
      </div>
    </div>
  )
}

export default SnackboxCard