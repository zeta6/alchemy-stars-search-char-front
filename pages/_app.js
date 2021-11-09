import 'bootstrap/dist/css/bootstrap.min.css'
import 'assets/css/globals.css'
import 'assets/css/custom.css'
import 'assets/css/myAurorians.css'
import 'assets/css/recruitSimulator.css'
import Layout from 'components/Layout'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }) {
  return(
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  )
}


export default MyApp
