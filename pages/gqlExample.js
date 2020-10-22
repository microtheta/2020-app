import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '../apollo/client'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
      address {
          location
          city
      }
    }
  }
`

const Index = () => {
  //const { data: { viewer } } = useQuery(ViewerQuery)

  const { loading, error, data }= useQuery(ViewerQuery)
  const viewer = data?.viewer;
  if(loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      You're signed in as {viewer.name} and you're {viewer.status} from {viewer.address.city} goto{' '}
      <Link href="/example">
        <a>static</a>
      </Link>{' '}
      page.
    </div>
  )
}

/* export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerQuery,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}
 */
export default Index