import React from 'react'
import Head from "next/head";
function PageHead() {
  const title = "Buffeti"
  return (
    <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta property="og:site_name" key="og:site_name" content="Buffeti" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <link rel="shortcut icon" href="/logo/primary_red.ico" />
        <link rel="icon" type="image/png" sizes="128x128" href="/logo/primary_red.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/logo/primary_red.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/primary_red.png" />
        {/* OG */}
        <meta property="og:image" key="og:image" content={`/logo/primary_red.png`} />
        <meta property="og:type" key="og:type" content="website" />
        <meta property="og:image:type" key="og:image:type" content="image/png" />
        <meta property="og:image:width" key="og:image:width" content="512" />
        <meta property="og:image:height" key="og:image:height" content="512" />
        <link rel="manifest" href="/site.webmanifest" />
        
    </Head>
  )
}

export default PageHead