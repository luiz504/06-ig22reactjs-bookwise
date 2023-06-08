import { Html, Head, Main, NextScript } from 'next/document'
import { getCssText, theme } from '~/styles'

export default function Document() {
  return (
    <Html lang="en" style={{ backgroundColor: theme.colors.gray800.value }}>
      <Head>
        <link rel="icon" href="/logo.svg" />

        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
