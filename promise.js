// 三个状态：PENDING、FULFILLED、REJECTED
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
function _Promise(excutor) {
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
_Promise.prototype.then = function (resFn, rejFn) {
  resFn = typeof resFn === 'function' ? resFn : function () {}
  rejFn = typeof rejFn === 'function' ? rejFn : function () {}
  if (this.status === FULFILLED) {
    resFn(this.value)
  }
  if (this.status === REJECTED) {
    rejFn(this.reason)
  }
  if (this.status === PENDING) {
    this.onResolveCallbacks.push(() => { resFn(this.value) })
    this.onRejectCallBacks.push(() => { resFn(this.reason) })
  }
}

let a = new _Promise((res, rej) => {
  setTimeout(() => {
    console.log(1)
    res('异步任务回调')
  }, 5000)
})

a.then(val => {
  console.log('then res' + val)
})