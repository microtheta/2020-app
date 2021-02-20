import { ApolloServer, AuthenticationError, } from 'apollo-server-micro'
import { schema } from 'apollo/schema'
import packageConfig from 'package.json'
import { verifyIdToken } from 'utils/auth/firebaseAdmin.server'
import { db } from 'utils/db.server'

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, event, context }) => {
    const headers = event ? event.headers : req.headers;
    const { token } = headers
    try {
      const currentUser = await verifyIdToken(token, true)
      return {
        db,
        currentUser,
        headers: event ? event.headers : req.headers,
        functionName: context ? context.functionName : '',
        req: event ? event : req,
        context,
      }
    } catch (error) {
      throw new AuthenticationError('You are unauthorised ' + error.message);
    }
  },
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