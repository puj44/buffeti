import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import PageHead from "@/components/Common/PageHead";
import LaunchingSoon from "@/components/LaunchingSoon";
import "@/styles/globals.scss";


export default function App({ Component, pageProps }) {
  return(
   <main>
     <LaunchingSoon />
    {/*
    <Header />
    <div className="page-content min-h-[80vh]">
      <Component {...pageProps} />
    </div>
    <Footer /> */}
   </main>
  )
}
