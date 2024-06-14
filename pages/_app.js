

import LaunchingSoon from "@/components/LaunchingSoon";
import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import { Provider, useDispatch } from "react-redux";
import {wrapper} from "../redux/store";
import { getData, setData } from "@/redux/reducers/homeReducer";
import { getDataApi } from "@/redux/requests/homeRequests";
import { hasCookie } from "cookies-next";
import { getTokenStatus } from "@/redux/reducers/authReducer";
import { useEffect } from "react";

function App({ Component, pageProps, props }) {
  const {locations} = props;

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTokenStatus());
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

export async function fetchData(params, store) {
  await Promise.all([
    store.dispatch(getData())
  ]);
  await store.dispatch(END);
  await store.sagaTask.toPromise();
}

App.getInitialProps = async(props)=>{
    const {data} = await getDataApi({});
    let locations = [];
    if(data?.statusCode === 200){
      locations = data?.data?.locations;
    }
      return {
      props:{
        locations
      }
    }
}

// export const getInitialProps = wrapper.getInitialProps(
//   (store) => async (props) => {
//     console.log("HERE");
//     await fetchData(props.params, store);
//     const locations = await store.getState().home.locations;
//     console.log("ASD",locations);
//     return {
//       props:{
//         locations
//       }
//     }
//   }
// );

export default wrapper.withRedux(App);

