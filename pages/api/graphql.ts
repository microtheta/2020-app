import { ApolloServer } from 'apollo-server-micro'
import { schema } from 'apollo/schema'
import { db } from 'utils/db'

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, event, context }) => ({
    db,
    headers: event ? event.headers : req.headers,
    functionName: context ? context.functionName : '',
    req: event ? event : req,
    context,
  }),
  playground: {
    endpoint: "/api/graphql"
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })