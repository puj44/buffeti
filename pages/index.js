import Banners from "@/components/Homepage/Banners";
// import SuggestivePackage from "@/components/Homepage/SuggestivePackage";
import { wrapper} from "../redux/store";
import { useEffect, useState } from "react";
import {  getPackagesData, setFilters } from "@/redux/reducers/packageReducer";
import { END } from "redux-saga";
import { getFiltersApi } from "@/redux/requests/packageRequests";
import { getCookie} from "cookies-next";
import SnackboxCard from "@/components/Homepage/SnackboxCard";
import MiniThaliCard from "@/components/Homepage/MiniThaliCard";
import { useSelector } from "react-redux";
// import ViewCart from "@/components/Common/ViewCart";
import dynamic from "next/dynamic";
import PackageCardLoader from "@/components/SkeletonLoader/PackageCardLoader";
// const ViewCart = dynamic(()=> import("@/components/Common/ViewCart"),{ssr:false});
const SuggestivePackage = dynamic(()=> import("@/components/Homepage/SuggestivePackage"),{loading:()=><><PackageCardLoader /><PackageCardLoader /><PackageCardLoader /></>});


export default function Home(props) {
  const {noOfPeople,packages,filters} = props;
  const [isCartAdded, setIsCartAdded] = useState(false);
  const {cartDetails} = useSelector((state) => state.cart);
  // useEffect(()=>{
  //   if(Object.keys(cartDetails ?? {}).length > 0){
  //     setIsCartAdded(true);
  //   }else{
  //     setIsCartAdded(false);
  //   }
  // },[cartDetails])
  return (
    <div
      className={`${ process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV" ? "flex flex-col md:gap-6 gap-4 py-8  page-spacing ":""}`} style={{alignItems:"stretch"}}
    >
          <Banners />
          {packages?.length > 0 && <SuggestivePackage data={packages[0]} noOfPeople={noOfPeople} filters={filters} />}
          <h4 className="font-semibold hidden page-title 2xl:text-center sm:block">Snack box And Mini Meals</h4>
          <div className="max-w-[1120px] w-full flex self-center">
            <div className="flex flex-col sm:flex-row w-full  gap-6 ">
              <SnackboxCard />
              <MiniThaliCard />
            </div>
          </div>
          {/* {
            isCartAdded &&
            <div className="block md:hidden">
              <ViewCart show={true} />
            </div>
          } */}
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
    let noOfPeople = getCookie("no_of_people") ?? "10_20";
    if(noOfPeople){
        const qty = Number(noOfPeople);
        if(qty > 20 && qty <= 30){
            noOfPeople = "20_30";

        }else if(qty  > 30){
            noOfPeople = "30_plus"
        }
    }
    let data = await fetchData(store,location);
    data.noOfPeople = noOfPeople;
    data.location = location ?? null;
    return {
      props:{
        ...data
      }
    }
  }
)
