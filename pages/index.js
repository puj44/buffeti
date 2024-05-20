import Banners from "@/components/Homepage/Banners";
import CateringServices from "@/components/Homepage/CateringServices";
import MiniThali from "@/components/Homepage/MiniThali";
import SnackBox from "@/components/Homepage/SnackBox";
import SuggestivePackage from "@/components/Homepage/SuggestivePackage";
import LaunchingSoon from "@/components/LaunchingSoon";
import { getMobileOtp, getTokenStatus } from "@/redux/reducers/authReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const services = {
    "snack-box":{
        title:"Snack Box",
        img:"/catering_services/snack_box.webp",
        width:378.12,
        height:240,
        description:"Advantage of food packages with multiple options available in it",
        url:"/coming-soon",
        categories:[
          {
            title:"Starter",
            img:"/catering_services/category_1.webp",
            width:181,
            height:183
          },
          {
            title:"Starter",
            img:"/catering_services/category_1.webp",
            width:181,
            height:183
          },
          {
            title:"Starter",
            img:"/catering_services/category_1.webp",
            width:181,
            height:183
          },
          {
            title:"Starter",
            img:"/catering_services/category_1.webp",
            width:181,
            height:183
          },
          {
            title:"Starter",
            img:"/catering_services/category_1.webp",
            width:181,
            height:183
          },
          {
            title:"Starter",
            img:"/catering_services/category_1.webp",
            width:181,
            height:183
          }
        ]
    },
    "suggestive-package":{
        title:"Suggestive Packages",
        img:"/catering_services/suggestive_package.webp",
        width:382,
        height:394,
        description:"Advantage of food packages with multiple options available in it",
        url:"/coming-soon"
    },
    "mini-thali":{
        title:"Mini Thali",
        img:"/catering_services/mini_thali.webp",
        width:378.12,
        height:240,
        description:"Advantage of food packages with multiple options available in it",
        url:"/coming-soon"
    }
}
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTokenStatus());
  },[dispatch])
  return (
    <div
      className={`${ process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV" ? "flex flex-col md:gap-6 gap-4 py-8  page-spacing ":""}`} style={{alignItems:"stretch"}}
    >
          <Banners />
          <CateringServices services={services}/>
          {services["suggestive-package"] && <SuggestivePackage data={services["suggestive-package"]} />}
          {services["snack-box"] && <SnackBox data={services["snack-box"]} />}
          {services["mini-thali"] && <MiniThali data={services["mini-thali"]} />}
    </div>
  );
}
