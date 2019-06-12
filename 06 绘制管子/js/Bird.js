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
	// 定义鸟的状态 
	this.state = "D"; // D: down  U: up
	// 为了确保鸟的下降速度，定义speed属性
	this.speed = 0;
}

//鸟扇动翅膀
Bird.prototype.fly = function(){
	//改变图片索引值
	this.index ++;
	//确保图片的有效值
	if(this.index >= this.imgArr.length){
		this.index = 0;
	}
	// 这里虽然索引值改变了但是图片没有改变
	this.img = this.imgArr[this.index];
}

// 鸟下降
Bird.prototype.fallDown = function() {
	// 判断鸟的状态
	if (this.state === "D") {
		// 改变this.speed
		this.speed++;
		// 下降
		this.y += Math.sqrt(this.speed);
	} else {
		// 上升
		this.speed--;
		if (this.speed == 0) {
			// 改变鸟的状态
			this.state = "D";
			return;
		}
		this.y -= Math.sqrt(this.speed);
	}
}

// 鸟的上升
Bird.prototype.goUp = function() {
	// 改变鸟的状态
	this.state = "U";
	this.speed = 20;
}