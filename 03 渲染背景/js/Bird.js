// 鸟的实例
function Bird(imgArr, x, y) {
	// 图片数组
	this.imgArr = imgArr;
	// 定义图片的索引值
	this.index = parseInt(Math.random() * this.imgArr.length);
	// 精确一张图片
	this.img = this.imgArr[this.index];
	// 图片的x点
	this.x = x;
	// 图片的y点
	this.y = y;
}