import { useEffect, useState } from "react"
import axios from 'axios';
import { User } from '@prisma/client'
import { log } from 'utils/logger'

export const service = axios.create({
  timeout: 60 * 2 * 1000,
  headers: {
    'Accept': 'application/json'
  }
})

import { useUser } from 'utils/auth/useUser'

export const useSyncUser = () => {

  const { token } = useUser()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<User>()
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
      log('Started User Sync')
      return service.get('/api/syncUser').then((data) => {
        const userData: User = data as any;
        log(['User Synced', data])
        setUserData(userData)
        setLoading(false)
      }).catch(e => {
        setLoading(false)
        setError(e.message || 'There was error while syncing user.')
        log(['Error in User Syncing ', e], 'error')
      })
    }
    syncFn()

  }, [token])

  return { loading, userData, error }
}

const useFetch = (url: string, headers = {}) => {
  return async () => {
    return service.get(url, {
      headers
    })
  }
}

export default useFetch