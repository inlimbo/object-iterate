const objective = (obj) => {
  var isobject =
    (obj) =>
      typeof obj === 'object' && ({}).toString.call(obj) === '[object Object]'

  if (!isobject(obj)) return

  var cache = Object.keys(obj)
  var l = cache.length

  var each = function (cb) {
    if (!l) return

    cache.forEach((k) => {
      cb(obj[k], k, obj)
    })

    return obj
  }

  var updateCache = function (key) {
    cache.push(key)
    leng = cache.length
  }

  var set = function (k ,v) {
    updateCache(k)
    obj[k] = v
  }

  var map = function (cb) {
   if (!l) return

   var o = cache.reduce((acc, k) => {
     acc[k] = cb(obj[k], k, o) || obj[k]
     return acc;
   }, {})

   return objective(o)
  }

  var filter = function (cb) {
    if (!l) return

    var o = cache.reduce((acc, k) => {
      if (cb(obj[k], k, o))
        acc[k] = obj[k]

      return acc;
    }, {})

    return objective(o)
  }

  Object.defineProperties(obj, {
    set: { value: set },
    each: { value: each },
    map: { value: map },
    filter: { value: filter }
  })

  return obj
}

module.exports = objective;