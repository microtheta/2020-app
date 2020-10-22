export default {
    Query: {
        viewer(_parent, _args, _context, _info) {
            return { id: 1, name: 'John Smith', status: 'cached', address: {} }
        },
    },
}
