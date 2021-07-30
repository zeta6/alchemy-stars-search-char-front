import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Index = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(router.push, 1000 , '/SearchAurorian')
  }, [router])

  return(
    <div className="index-loading">loading...</div>
  )
}

export default Index;