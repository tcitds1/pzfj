new Promise((resolve) => {
  resolve();
  Promise.resolve({
    then: function(resolve, reject) {
      console.log(1);
      resolve();
    },
  }).then(() => console.log(2));
  console.log(0);
}).then(() => console.log(3));

// 
// 立即执行函数 console.log(0)
// 

// Promise.resolve

// Promise.resolve = function(data) {
//   if (data.then) {
//     return Promise.resolve(new Promise((resolve, reject) => {
//       data.then(resolve)
//     }))
//   }
// }