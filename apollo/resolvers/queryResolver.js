import { from } from "@apollo/client";
import { db } from 'utils/db'

export default {
  Query: {
    viewer: async (_parent, _args, _context, _info) => {
      const dbUser = await db.users.findFirst()
      const { id, name } = dbUser;
      return { id, name, status: 'cached-1', address: {} }
    },
  },
}
