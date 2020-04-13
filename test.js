Promise.all = (arr) => {
  return new Promise(function(resolve, reject) {
    if (!Array.isArray(arr)) {
      reject(new Error('参数必须是数组'))
    }
    let result = []
    let i = 0;
    try {
      for (let p of arr) {
        p.then((val) => {
          result.push(val)
          i++
          if (i === arr.length) {
            resolve(result)
          }
        }).catch(reason => {
          reject(reason)
        })
      }
    } catch(e) {
      reject(e)
    }
  })
}
Promise.race = (arr) => {
  return new Promise(function(resolve, reject) {
    if (!Array.isArray(arr)) {
      reject(new Error('参数必须是数组'))
    }
    try {
      for (let p of arr) {
        p.then((val) => {
          resolve(val)
        })
      }
    } catch(e) {
      reject(e)
    }
  })
}
// value
// reason
// status
// resolve(value)
// reject(reason)
// onFulfillCallback()
// onRejectCallback()
// then()
// resolutionPrecedure(x, promise, resolve, reject)