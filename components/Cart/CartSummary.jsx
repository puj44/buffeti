
import React from 'react'
// import OrderDatePicker from '../Common/OrderDatePicker'
import dynamic from 'next/dynamic'
const OrderDatePicker = dynamic(()=>import("../Common/OrderDatePicker"),{ssr:false})
function CartSummary({
    data,
    handleChangeDate,
    handleChangeTime,
    deliveryDate,
    deliveryTime
}) {
  return (
    <div className='border-[1px] border-[#A8A8AD80] rounded-lg w-full flex flex-col p-4 gap-5'>
        <p>{"Delivery Schedule"}</p>
        <div className='grid grid-cols-2 gap-4 w-full'>
           <OrderDatePicker
            handleChangeDate={handleChangeDate ?? (()=>{})}
            value={deliveryDate}
           />
        </div>
        <span className='border-[1px] border-dashed border-[#595959] w-full'></span>
        <p>{"Billing Details"}</p>
        <div className='flex flex-col gap-2 w-full' style={{fontSize:"16px !important"}}>
            {
                data?.item_pricing?.length > 0 &&
                data?.item_pricing.map((itemPrice,idx)=>{
                    return(
                        <div className='flex flex-row w-full gap-2 justify-between' key={"item-"+idx} >
                            <p className=''>{itemPrice.item_name + " X " +itemPrice.qty}</p>
                            <p className='text-nowrap'>{"₹"+itemPrice.amount}</p>
                        </div>
                    )
                })
            }
            {
                data?.extra_charges?.length > 0 &&
                <>
                <p className='font-semibold'>Extra Items</p>
              {      data?.extra_charges.map((extraCharge,idx)=>{
                        return(
                            <div className='flex flex-row w-full gap-1 justify-between' key={"extra-charge-"+idx} >
                                <p className=''>{extraCharge.item_name + " X " +extraCharge.qty}</p>
                                <p className='text-nowrap'>{"₹"+extraCharge.amount}</p>
                            </div>
                        )
                    })}
                </>
            }
            {
                Object.keys(data?.addon_charges ?? {})?.length > 0 && Number(data?.addon_charges?.addOnCharges ?? 0) > 0  &&
                <div className='flex flex-row gap-1 justify-between' >
                    <p className='font-medium'>{"Add On Charges X "+data.addon_charges.addOnChargesQty}</p>
                    <p className='text-nowrap'>{"₹"+data.addon_charges.addOnCharges}</p>
                </div>

            }
            {
                data?.coupon_code !== "" && data?.coupon_discount &&
                <div className='flex flex-row gap-1 justify-between' >
                    <p className='font-medium'>{"Coupon"}</p>
                    <p className='text-nowrap'>{"- ₹"+data?.coupon_discount}</p>
                </div>
            }
             <div className='flex flex-row gap-1 justify-between w-full mt-2'>
                <p className='font-medium'>{"GST"}</p>
                <p>{"₹"+Number(data?.total_billed_amount - data?.total_amount)}</p>
            </div>
        </div>
        <span className='border-[1px] border-dashed  border-[#595959] w-full'></span>
        <div className='flex flex-row gap-1 justify-between w-full items-center'>
            <p className='sub-title font-semibold text-color-charcoal'>{"Total"}</p>
            <p className='package-title font-medium'>{"₹"+data?.total_billed_amount}</p>
        </div>
    </div>
  )
}

export default CartSummary