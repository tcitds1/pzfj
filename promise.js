// 三个状态：PENDING、FULFILLED、REJECTED
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
function _Promise(excutor) {
  this.status = PENDING
  this.value = undefined
  this.reason = undefined
  let resolve = (val) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = val
    }
  }
  let reject = (val) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = val
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
}

let a = new _Promise((res, rej) => {
  console.log(1)
  res('hhleo')
})

a.then(val => {
  console.log('then res' + val)
})