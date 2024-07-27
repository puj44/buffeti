import { Datepicker, Dropdown } from 'flowbite-react'
import Image from 'next/image'
import React from 'react'
const customDateTheme = {
    "root": {
      "base": "relative"
    },
    "popup": {
      "root": {
        "base": "absolute top-10 z-50 block pt-2",
        "inline": "relative top-0 z-auto",
        "inner": "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700"
      },
      "header": {
        "base": "",
        "title": "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
        "selectors": {
          "base": "mb-2 flex justify-between",
          "button": {
            "base": "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
            "prev": "",
            "next": "",
            "view": ""
          }
        }
      },
      "view": {
        "base": "p-1"
      },
      "footer": {
        "base": "mt-2 flex space-x-2",
        "button": {
          "base": "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
          "today": "bg-cyan-700 text-white hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700",
          "clear": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        }
      }
    },
    "views": {
      "days": {
        "header": {
          "base": "mb-1 grid grid-cols-7",
          "title": "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400"
        },
        "items": {
          "base": "grid w-64 grid-cols-7",
          "item": {
            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm  leading-9 hover:bg-[#F2F4F7] hover:rounded-[20px] ",
            "selected": "bg-[#F2F4F7] rounded-[20px] ",
            "disabled": "text-gray-500"
          }
        }
      },
      "months": {
        "items": {
          "base": "grid w-64 grid-cols-4",
          "item": {
            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-medium leading-9 text-gray-900 hover:bg-[#F2F4F7] hover:rounded-[20px] ",
            "selected": "bg-primary text-white rounded-[20px] hover:bg-primary",
            "disabled": "text-gray-500"
          }
        }
      },
      "years": {
        "items": {
          "base": "grid w-64 grid-cols-4",
          "item": {
            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-[#F2F4F7] hover:rounded-[20px] ",
            "selected": "text-white bg-primary rounded-[20px] hover:bg-primary",
            "disabled": "text-gray-500"
          }
        }
      },
      "decades": {
        "items": {
          "base": "grid w-64 grid-cols-4",
          "item": {
            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            "selected": "bg-primary text-white rounded-[20px] hover:bg-primary",
            "disabled": "text-gray-500"
          }
        }
      }
    }
  }

  const customDropdownTheme = {
      content:"py-0",
        floating:{
            divider:"my-1 h-px ",
            item:{
                container: "bg-white ",
                base: "flex p-0 cursor-pointer px-0 py-0 bg-white focus:outline-none",
                icon: "mr-2 h-4 w-4"
            },
            
    
            style:{
                dark:"p-0 bg-white rounded-lg shadow-none mt-1",
                light:"p-0 bg-white rounded-lg shadow-none mt-1",
                auto:"p-0 bg-white rounded-lg shadow-none mt-1",
            }
        }
  };

  let nextDate = new Date();
  nextDate.setDate(nextDate.getDate()+1)
function OrderDatePicker({
    handleChangeDate,
    value
}) {
    const formatDate = (val) =>{
        const today = new Date(val);
        if(today){

            const yyyy = today?.getFullYear();
            let mm = today?.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
    
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
    
            const formattedToday = dd + '/' + mm + '/' + yyyy;
    
            return formattedToday;
        }
    }
  return (
    <div className='border-[1px] border-[#E3E5E5] rounded-lg flex   py-2 px-2 md:px-4'>
       
        {
            <Dropdown 
                theme={{...customDropdownTheme}}
                label=""
                renderTrigger={()=>
                    <div className='flex flex-row gap-3 w-full justify-start items-center cursor-pointer'>
                         <Image
                            src={"/icons/calender.webp"}
                            width={24}
                            height={24}
                            priority
                            alt=''
                        />
                        <div className=''>
                            {formatDate(value ??new Date())}
                        </div>
                    </div>
                }
                dismissOnClick={false}
                placement='bottom'
            >
                <Dropdown.Item as="div">

                    <Datepicker
                        dateFormat="dd/MM/yyyy"
                        theme={customDateTheme}
                        value={value ?? nextDate}
                        onSelectedDateChanged={(date)=>{handleChangeDate(date)}}
                        minDate={nextDate}
                        showTodayButton={false}
                        showClearButton={false}
                        inline
                    />
                </Dropdown.Item>
            </Dropdown>
        }
    </div>
  )
}

export default OrderDatePicker