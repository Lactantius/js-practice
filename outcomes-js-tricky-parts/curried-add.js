function curriedAdd(n) {
  if (typeof n === "undefined") return 0;
  return function add(num) {
    if (typeof num === "undefined") return n;
    n += num;
    return add;
  };
}

module.exports = { curriedAdd };
