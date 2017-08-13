function times(first, ...args) {
    var r = {}, a1;
    if (args.length === 0) {
        return first.map((k,v) => ({[k]:v}));
    }
    a1 = args[0].times(...args.slice(1));
    first.forIn((k1,v1) => {
        r[k1] = a1.deepen(args.length - 1, (k, v) => Object.assign({[k1]:v1},v));
    })
    return r;
};

export default times;