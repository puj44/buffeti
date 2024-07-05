

import LaunchingSoon from "@/components/LaunchingSoon";
import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import { Provider, useDispatch } from "react-redux";
import {store, wrapper} from "../redux/store";
import { getData, setData } from "@/redux/reducers/homeReducer";
import { getDataApi } from "@/redux/requests/homeRequests";
import { hasCookie } from "cookies-next";
import { getTokenStatus } from "@/redux/reducers/authReducer";
import { useEffect } from "react";
import { END } from "redux-saga";
import { getCartDetails } from "@/redux/reducers/cartReducer";

function App({ Component, pageProps, props }) {
  const {locations} = props;

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTokenStatus());
    dispatch(getCartDetails());
  },[dispatch])
  dispatch(setData({statusCode:200, data:{locations}}))
  return(
    // <Provider store={store}>
        process.env.NEXT_PUBLIC_ENVIRONMENT !== "DEV" ? 
        <LaunchingSoon />:
        <div className="page-content min-h-[80vh]">
          
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
  )
}

export async function fetchData() {
  await store.dispatch(getData())
  await store.dispatch(END);
  await store.sagaTask.toPromise();
  return true;
}



App.getInitialProps = async(props)=>{
    await fetchData();
    const {locations} = await store?.getState()?.home;
      return {
      props:{
        locations
      }
    }
}

export default wrapper.withRedux(App);

