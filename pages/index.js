import Banners from "@/components/Homepage/Banners";
import SuggestivePackage from "@/components/Homepage/SuggestivePackage";
import { wrapper} from "../redux/store";
import { useEffect } from "react";
import {  getPackagesData, setFilters } from "@/redux/reducers/packageReducer";
import { END } from "redux-saga";
import { getFiltersApi } from "@/redux/requests/packageRequests";
import { getCookie } from "cookies-next";


export default function Home(props) {
  const {filters,packages} = props;
  return (
    <div
      className={`${ process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV" ? "flex flex-col md:gap-6 gap-4 py-8  page-spacing ":""}`} style={{alignItems:"stretch"}}
    >
          <Banners />
          {packages?.length > 0 && <SuggestivePackage data={packages[0]} filters={filters} />}
    </div>
  );
}

async function fetchData(store,location) {
  const packageFilters = (await getFiltersApi({payload:{menuOption:"click2cater", location}}))?.data; 
  const filters = packageFilters?.data?.filters;
  await store.dispatch(setFilters(packageFilters));
  if (filters && filters?.categories) {

    if (Object.keys(filters?.categories).length > 0) {
      const payload = {menuOption:"click2cater?category=" + Object.keys(filters.categories)[0], location};
      await store.dispatch(getPackagesData(payload));
      await store.dispatch(END);
      await store.sagaTask.toPromise();
    }
  }
  const packages = await store.getState()?.packages;
  return {
    filters:filters ?? {},
    packages:Object.keys(packages?.packages ?? {})?.length >0 ? Object.values(packages?.packages) : {}
  };
}

export const getServerSideProps =  wrapper.getServerSideProps(
  (store) => async(props) =>{
    const location = await getCookie("location",{req:props?.req,res:props?.res});
    const data = await fetchData(store,location);
    
    return {
      props:{
        ...data
      }
    }
  }
)
