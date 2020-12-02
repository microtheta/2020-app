import { from } from "@apollo/client";
import { db } from 'utils/db'

export default {
    Query: {
        viewer: async (_parent, _args, _context, _info) => {
            const dbUser = await db.users.findFirst()
            const { id } = dbUser;
            return { id, name: 'John Smith', status: 'cached-1', address: {} }
        },
    },
}
