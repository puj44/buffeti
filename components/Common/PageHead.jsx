import React from 'react'
import Head from "next/head";
function PageHead() {
  const title = "Buffeti"
  return (
    <Head>
        <title>{title}</title>
        <meta property="og:site_name" key="og:site_name" content="Buffeti" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <link rel="icon" href="/logo/logo_secondary.ico" />
        {/* OG */}
        <meta property="og:image" key="og:image" content={"/logo/logo_primary.png"} />
        <meta property="og:type" key="og:type" content="website" />
        <meta property="og:image:type" key="og:image:type" content="image/png" />
        <meta property="og:image:width" key="og:image:width" content="512" />
        <meta property="og:image:height" key="og:image:height" content="512" />
        <link rel="manifest" href="/site.webmanifest" />
    </Head>
  )
}

export default PageHead