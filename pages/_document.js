import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
        <script data-ad-client="ca-pub-2551455423822057" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

            <script
                    dangerouslySetInnerHTML={{
                    __html: `
                        (adsbygoogle = window.adsbygoogle || []).push({
                        google_ad_client: "YOUR_ID",
                        enable_page_level_ads: true
                    });
                      `
                }}
            />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}