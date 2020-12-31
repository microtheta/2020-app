import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from 'utils/auth/initFirebase'

import { mapUserData } from './mapUserData'

import type { UserType } from './mapUserData'

initFirebase()

const useUser = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<UserType | undefined>()
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
    const cancelAuthListener = firebase.auth().onIdTokenChanged((user) => {
      setIsLoading(false)
      if (user) {
        const userData = mapUserData(user)
        setUser(userData)
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

  return { user, logout, isLoading }
}

export { useUser }
