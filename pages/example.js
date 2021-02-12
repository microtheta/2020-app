import Link from 'next/link'
import { useEffect } from 'react'
import useFetch from 'utils/auth/useFetch'

const Example = (props) => {
  const fetcher = useFetch('/api/getFood')
  useEffect(() => {
    fetcher()
  }, [])
  return (
    <div>
      <p>
        This page is static because it does not fetch any data or include the
        authed user info..
      </p>
      <Link href={'/'}>
        <a>Home</a>
      </Link>
    </div>
  )
}

export default Example
