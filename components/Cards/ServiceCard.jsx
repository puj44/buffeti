import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ServiceCard({sv,idx}) {
  return (
    <div  className={`max-w-[382px] grid grid-flow-row gap-3 items-baseline `}>
        <Image
            src={sv.img}
            width={sv.width}
            height={sv.height}
            alt={sv.title}
            priority
            className={`${idx%2 !=0 ? "pb-3":""}`}
        />
        <div className='gap-2 flex flex-col'>
            <h5 className='product-title font-medium'>{sv.title}</h5>
            <p>{sv.description}</p>
            <Link className='flex flex-row gap-2 items-center' href={sv.url}>
                <p className='font-medium text-color-font-secondary'>View Now</p>
                <div>
                    <Image
                        src={"/arrows/r_arrow_o.webp"}
                        width={8}
                        height={14}
                        alt={"arrow"}
                        loading='lazy'
                    />
                </div>
            </Link>
        </div>
    </div>
  )
}

export default ServiceCard