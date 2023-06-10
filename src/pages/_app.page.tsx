import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Nunito } from 'next/font/google'

import { globalStyles } from '~/styles/global'

import '~/lib/dayjs'
globalStyles()
const nunito = Nunito({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: process.env.APP_DOMAIN,
          siteName: 'Ignite Call',
        }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${nunito.className}`}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
