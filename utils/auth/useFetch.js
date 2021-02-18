import { useEffect, useState } from "react"
import axios from 'axios';

export const service = axios.create({
  timeout: 60 * 2 * 1000,
  headers: {
    'Accept': 'application/json'
  }
})

import { useUser } from 'utils/auth/useUser'

export const useSyncUser = () => {

  const { user, token } = useUser()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    if (!token) {
      return
    }

    service.defaults.headers.common['token'] = token

    if (userData) {
      return
    }

    const syncFn = async () => {
      return service.get('/api/syncUser').then(data => {
        setUserData(data)
        setLoading(false)
      }).catch(e => {
        setLoading(false)
        setError(e.message || 'There was error while syncing user.')
      })
    }
    syncFn()

  }, [token])

  return { loading, userData, error }
}

const useFetch = (url, headers = {}) => {
  return async () => {
    return service.get(url, {
      headers
    })
  }
}

export default useFetch