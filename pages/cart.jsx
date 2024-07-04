import SavedAddresses from '@/components/Cart/SavedAddresses';
import { getAddresses } from '@/redux/reducers/addressReducer';
import React, { useEffect, useState } from 'react'
import { END } from 'redux-saga';
import {wrapper} from "../redux/store"
import { getCookie } from 'cookies-next';
function Cart({
    addresses
}) {
  const [cartData, setCartData] = useState({});
  useEffect(()=>{
    if(!cartData?.delivery_address_id){
        setCartData({...cartData, delivery_address_id:addresses?.[0]?._id});
    }
  },[]);


  const handleSelectAddress = (id) =>{
    setCartData({...cartData, delivery_address_id:id});
  }

  return (
    <div className="page-spacing py-4">
        <div className='flex flex-col md:flex-row gap-6 w-full'>
            <SavedAddresses 
                addresses={addresses} 
                handleSelectAddress={handleSelectAddress}
                selectedAddress={cartData?.delivery_address_id}
            />
        </div>
    </div>
  )
}
async function fetchData(store,location,token) {
  
    await store.dispatch(getAddresses({token, location}))
    await store.dispatch(END);
    await store.sagaTask.toPromise();
  }
  
  export const getServerSideProps =  wrapper.getServerSideProps(
    (store) => async(props) =>{
      const location = getCookie("location",{req:props?.req,res:props?.res});
      const token = getCookie("accessToken",{req:props?.req,res:props?.res});
      await fetchData(store,location,token);
      const {addresses} = await store.getState().address;
      return {
        props:{
            addresses:addresses ?? []
        }
      }
    }
  )
export default Cart