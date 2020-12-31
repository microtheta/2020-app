import { useEffect, useState } from "react"
import { useUser } from 'utils/auth/useUser'
import firebase from 'firebase/app'

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


const useFetch = (url, opts = { method: 'GET', headers: {} }) => {
  return async () => {
    const user = firebase.auth().currentUser;
    const token = await user.getIdToken()
    return fetch(url, {
      method: opts.method,
      headers: new Headers({ 'Content-Type': 'application/json', token, ...opts.headers })
    }).then((res) => res.json())
  }
}

export default useFetch