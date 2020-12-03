import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from 'utils/auth/initFirebase'

import {
  removeUserCookie,
  setUserCookie,
  //getUserFromCookie,
} from './userCookies'
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
        setUserCookie(userData)
        setUser(userData)
      } else {
        removeUserCookie()
        setUser(undefined)
      }
    })

    /*
    // Can't ensure that this is still a valid token user! 
    const userFromCookie = getUserFromCookie()
    if (userFromCookie) {
      setUser(userFromCookie)
    } */

    return () => {
      cancelAuthListener()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, logout, isLoading }
}

export { useUser }
