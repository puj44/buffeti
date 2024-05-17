

import LaunchingSoon from "@/components/LaunchingSoon";
import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import {store,wrapper} from "../redux/store";

function App({ Component, pageProps }) {
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

export default wrapper.withRedux(App);