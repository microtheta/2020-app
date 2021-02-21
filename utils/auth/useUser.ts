import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from 'utils/auth/initFirebase'

const useUser = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<firebase.User>()
  const [token, setToken] = useState<string>()
  const router = useRouter()

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        router.push('/login')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    initFirebase()
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
