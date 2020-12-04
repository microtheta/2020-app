import { ApolloServer } from 'apollo-server-micro'
import { schema } from 'apollo/schema'
import { db } from 'utils/db'
import packageConfig from 'package.json'

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, event, context }) => ({
    db,
    headers: event ? event.headers : req.headers,
    functionName: context ? context.functionName : '',
    req: event ? event : req,
    context,
  }),
  formatResponse: (response: any, requestContext: any) => {
    if (requestContext.response && requestContext.response.http) {
      requestContext.response.http.headers.set('package-version', packageConfig.version);
    }
    return response;
  },
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