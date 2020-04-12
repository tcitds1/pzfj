function Animals() {

}
Animals.prototype.run = function() {
	console.log('i say run')
}

function Dog() {

}
Dog.prototype = Object.create(Animals.prototype)
Dog.prototype.constructor = Dog

