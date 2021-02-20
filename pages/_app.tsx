import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'apollo/client'
import { useSyncUser } from 'utils/auth/useFetch'
import Loader from 'components/ui/Loader'
import NotificationContainer from 'components/notify/notify';
import type { AppProps /*, AppContext */ } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  const { loading, error, userData } = useSyncUser()

  if (loading) {
    return <Loader />
  }

  if (error || !userData?.id) {
    <div>Error while syncing user: {error}</div>
  }

  return (
    <ApolloProvider client={apolloClient}>
      <NotificationContainer />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}