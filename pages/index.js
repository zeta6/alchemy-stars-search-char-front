import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Index = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/search-aurorian')
  }, [router])

  return(
    <div>loading</div>
  )
}

export default Index;