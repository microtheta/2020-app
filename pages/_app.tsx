import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'apollo/client'
import { useSyncUser } from 'utils/auth/useFetch'
import Loader from 'components/Loader'
import NotificationContainer from 'components/notify/notify';
import type { AppProps /*, AppContext */ } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  const syncedUser = useSyncUser()

  if (!syncedUser) {
    return <Loader />
  }

  return (
    <ApolloProvider client={apolloClient}>
      <NotificationContainer />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}