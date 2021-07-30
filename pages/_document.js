import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            />
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