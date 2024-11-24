import React from 'react'
import {wrapper} from "../../redux/store"
import { getCategories, getItemsData } from '@/redux/reducers/itemsReducer';
import { getCookie } from 'cookies-next';
import CreatePackage from '@/components/CustomisePackage/CreatePackage';
import { END } from 'redux-saga';
function CreateSnackbox({
  items,
  noOfPeople,
  categories
}) {
  return (
    <CreatePackage 
      menuOption={"snack-boxes"} 
      packageDetails={{...items ?? {}}}
      noOfPeople={noOfPeople}
      categories={{...categories ?? {}}}
    />
  )
}
async function fetchData(store,location) {
  await Promise.all([

    await store.dispatch(getItemsData({menuOption:"snack-boxes", location})),
    await store.dispatch(getCategories({menuOption:"snack-boxes", location})),
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
        categories:categories ?? {},
      }
    }
  }
)
export default CreateSnackbox
