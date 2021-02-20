import { db } from 'utils/db.server'

export default {
  Query: {
    viewer: async (/* _parent, _args, _context, _info */) => {
      const dbUser = await db.user.findFirst() || { name: '', id: '' }
      const { id, name } = dbUser;
      return { id, name, status: 'cached-1', address: {} }
    },
  },
}
