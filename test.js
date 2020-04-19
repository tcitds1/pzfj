// 构建一个jsonp
let sc = document.createElement('script')
sc.src = "url?callBack=xxx"
document.body.append(sc)