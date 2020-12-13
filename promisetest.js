new Promise((resolve, reject) => {
  resolve('123')
}).then().then(val => {
  console.log(val)
})