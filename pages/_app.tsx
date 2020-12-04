import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'apollo/client'

import NotificationContainer from 'components/notify/notify';

import type { AppProps /*, AppContext */ } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <NotificationContainer />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}