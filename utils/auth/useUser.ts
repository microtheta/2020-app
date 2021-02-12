import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from 'utils/auth/initFirebase'

import type Firebase from 'firebase'

initFirebase()

const useUser = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<Firebase.User>()
  const [token, setToken] = useState<String>()
  const router = useRouter()

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        router.push('/auth')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebase.auth().onIdTokenChanged(async (user) => {
      const cToken = await user?.getIdToken()
      setToken(cToken)
      setIsLoading(false)
      if (user) {
        setUser(user)
      } else {
        setUser(undefined)
        firebase.auth().signInAnonymously()
      }
    })

    return () => {
      cancelAuthListener()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, token, logout, isLoading }
}

export { useUser }
