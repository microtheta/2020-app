const allFiles = (ctx => {
    let keys = ctx.keys();
    let values = keys.map(ctx);
    return keys.reduce((o, k, i) => {
        if (values[i].default) {
            o.push(values[i].default);
        }
        return o;
    }, []);
})(require.context('./', true, /.*/));

export const typeDefs = allFiles