import CreatePackage from '@/components/CustomisePackage/CreatePackage';
import { getCategories, getItemsData } from '@/redux/reducers/itemsReducer';
import React from 'react'
import {wrapper} from "../../redux/store"
import { getCookie } from 'cookies-next';
import { END } from 'redux-saga';

function CustomisePackage({
  items,
  noOfPeople,
  packageName,
  categories
}) {
  return (
    <CreatePackage 
      packageName={packageName ?? null} 
      menuOption={"click2cater"} 
      packageDetails={{...items ?? {}}}
      categories={{...categories ?? {}}}
      noOfPeople={noOfPeople}
    />
  )
}
async function fetchData(store,location) {
  await Promise.all([

    await store.dispatch(getItemsData({menuOption:"click2cater", location})),
    await store.dispatch(getCategories({menuOption:"click2cater", location})),
  ]);
  await store.dispatch(END);
  await store.sagaTask.toPromise();
}

export const getServerSideProps =  wrapper.getServerSideProps(
  (store) => async(props) =>{
    const location = await getCookie("location",{req:props?.req,res:props?.res});
    await fetchData(store,location);
    const {items,categories} = await store.getState().items;
    const noOfPeople = getCookie("no_of_people",{req:props?.req,res:props?.res});
      
    return {
      props:{
        items:items ?? {},
        noOfPeople:noOfPeople ?? 10,
        packageName:props?.params?.packageName,
        categories:categories ?? {}
      }
    }
  }
)
export default CustomisePackage