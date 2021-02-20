import Link from 'next/link'
import { ProtectRoute } from 'utils/auth/protectRoute'

const Private = () => {
  return (
    <div>
      <p>
        This page is an example of Protected page, if user is not logged it will redirect to home page.
      </p>
      <Link href={'/'}>
        <a>Home</a>
      </Link>
    </div>
  )
}

export default ProtectRoute(Private)
