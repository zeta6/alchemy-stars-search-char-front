import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/custom.css';
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }) {
  return(
    <RecoilRoot>
      <Component {...pageProps} />
   </RecoilRoot>
  )
}

export default MyApp
