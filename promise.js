// 三个状态：PENDING、FULFILLED、REJECTED
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function resolvePromise (promise2, x, resolve, reject) {
  resolve(x)
}

function Promise(excutor) {
  this.status = PENDING
  this.value = undefined
  this.reason = undefined
  // resolve 和 reject 在异步情况下，then 会先执行，可以在then中先把回调函数先存起来
  this.onResolveCallbacks = []
  this.onRejectCallBacks = []
  let resolve = (val) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = val
      this.onResolveCallbacks.forEach(fn => {
        fn()
      })
    }
  }
  let reject = (val) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = val
      this.onRejectCallBacks.forEach(fn => {
        fn()
      })
    }
  }
  try {
    excutor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}
Promise.prototype.then = function (resFn, rejFn) {
  resFn = typeof resFn === 'function' ? resFn : v => v
  rejFn = typeof rejFn === 'function' ? rejFn : error => { throw error }
  let promise1 = new Promise((resolve, reject) => {
    if (this.status === FULFILLED) {
      try {  
        setTimeout(() => {
          let x = resFn(this.value)
          resolvePromise(promise1, x, resolve, reject)
        })
      } catch (e) {
        reject(e)
      }
    }
    if (this.status === REJECTED) {
      try {  
        setTimeout(() => {
          let x = rejFn(this.value)
          resolvePromise(promise1, x, resolve, reject)
        })
      } catch (e) {
        reject(e)
      }
    }
    if (this.status === PENDING) {
      this.onResolveCallbacks.push(() => { 
        try {  
          setTimeout(() => {
            let x = resFn(this.value)
            resolvePromise(promise1, x, resolve, reject)
          })
        } catch (e) {
          reject(e)
        }
      })
      this.onRejectCallBacks.push(() => { 
        try {  
          setTimeout(() => {
            let x = rejFn(this.value)
            resolvePromise(promise1, x, resolve, reject)
          })
        } catch (e) {
          reject(e)
        }
      })
    }
  })
}

let a = new Promise((res, rej) => {
  setTimeout(() => {
    console.log(1)
    res('异步任务回调')
  }, 5000)
})

a.then(val => {
  console.log('then res' + val)
})