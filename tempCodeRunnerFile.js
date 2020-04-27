
// Promise.resolve

// Promise.resolve = function(data) {
//   if (data.then) {
//     return Promise.resolve(new Promise((resolve, reject) => {
//       data.then(resolve)
//     }))
//   }
// }