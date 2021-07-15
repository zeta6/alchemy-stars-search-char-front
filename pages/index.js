import Link from 'next/link'
import Image from 'next/image'

const Index = () => {
  return(
    <div>
      <Link href="/SearchChar">
        <h1>search!</h1>
      </Link>
      <Link href="/ref1">
        <h1>ref1!</h1>
      </Link>
      <div style={{ width:50, height:50 }}>
        {/* <Image src="/testpi.jpg" alt="test picture" layout="fill"></Image> */}
        <img src="/testpi.jpg"></img>
      </div>
    </div>
  )
}

export default Index;