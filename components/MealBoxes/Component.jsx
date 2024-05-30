import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Component({mealBox, services}) {
    const [currentMeal, setCurrentMeal] = useState(mealBox);
    const router = useRouter();
    const [initialState,setCurrentState ] = useState("new");
    useEffect(()=>{
    },[router])
  return (
    <div className='page-spacing py-6 gap-6'>
        {
            <h3 className='font-semibold  page-title'>Meals</h3>
        }
        <div className="grid grid-flow-col justify-stretch">
            {
                Object.keys(services).map((d,idx)=>{
                    return(
                        <div className="relative w-fit" key={"meal-box-"+idx}>
                            {
                                mealBox === d?
                                <h1 className={`sub-title font-medium active-nav  `}>{services[d].title}</h1>
                                :
                                <Link className='text-color-dark-gray sub-title cursor-pointer' href={`/meal-boxes/${d}`}>
                                    <h3>{services[d].title}</h3>
                                </Link>
                            }
                        </div>
                    )
                })
            }

        </div>
    </div>
  )
}

export default Component