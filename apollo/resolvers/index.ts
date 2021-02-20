const allFiles = (ctx => {
    let keys = ctx.keys();
    let values: any = keys.map(ctx);
    return keys.reduce((o: any, _: any, i: number) => {
        if (values[i].default) {
            o.push(values[i].default);
        }
        return o;
    }, []);
})(require.context('./', true, /.(js|ts)$/));

export const resolvers = allFiles;