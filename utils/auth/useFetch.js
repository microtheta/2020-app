import { useEffect, useState } from "react"
import { useUser } from 'utils/auth/useUser'

export const useSyncUser = () => {

  const { user } = useUser()
  const [userData, setUserData] = useState()

  useEffect(() => {
    if (!user) {
      return
    }

    return fetch('/api/syncUser', {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json', token: user.token }),
      credentials: 'same-origin',
    }).then((res) => res.json()).then(data => {
      setUserData(data)
    })

  }, [user])
  return userData
}
