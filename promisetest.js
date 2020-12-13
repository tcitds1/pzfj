new Promise((resolve, reject) => {
  resolve('hello')
}).then('haha').then(val => {
  console.log(val)
})