import Banners from "@/components/Homepage/Banners";
import CateringServices from "@/components/Homepage/CateringServices";
import LaunchingSoon from "@/components/LaunchingSoon";
import { getMobileOtp } from "@/redux/reducers/authReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(()=>{
    // dispatch(getMobileOtp({phoneNumber:"9879651515"}));
  },[dispatch])
  return (
    <div
      className={`${ process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV" ? "flex flex-col md:gap-6 gap-4 py-8  page-spacing":""}`} style={{alignItems:"stretch"}}
    >
          <Banners />
          <CateringServices />
    </div>
  );
}
