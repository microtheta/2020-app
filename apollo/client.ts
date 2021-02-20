import { useMemo } from 'react'
import { ApolloClient, ApolloLink, InMemoryCache, concat } from '@apollo/client'
import { service } from 'utils/auth/useFetch'

let apolloClient: any

function createIsomorphLink() {
    if (typeof window === 'undefined') {
        const { SchemaLink } = require('@apollo/client/link/schema')
        const { schema } = require('./schema')
        return new SchemaLink({ schema })
    } else {
        const { HttpLink } = require('@apollo/client/link/http')
        return new HttpLink({
            uri: '/api/graphql',
            credentials: 'same-origin',
        })
    }
}

const authMiddleware =
    new ApolloLink((operation, forward) => {
        const token = service.defaults.headers.common['token'];
        // add the authorization to the headers
        operation.setContext({
            headers: {
                token,
            }
        });

        return forward(operation);
    })


function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: concat(authMiddleware, createIsomorphLink()),
        cache: new InMemoryCache(),
    })
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient()

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        _apolloClient.cache.restore(initialState)
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

export function useApollo(initialState: any) {
    const store = useMemo(() => initializeApollo(initialState), [initialState])
    return store
}