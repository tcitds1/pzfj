// Promise.resolve = function(data) {
//   if (data.then) {
//     return Promise.resolve(new Promise((resolve, reject) => {
//       data.then(resolve)
//     }))
//   }
// }

Promise.resolve(new Promise((resolve, reject) => {
  console.log(1)
  resolve('ya hello')
}))
console.log(2)

// Promise.resolve({
//   then: function(res, rej) {
//     console.log('yahaha')
//   }
// })
