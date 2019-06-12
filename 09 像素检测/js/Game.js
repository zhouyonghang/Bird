/**
 * Game 整个游戏类
 * @ctx 画笔
 * @bird 鸟的实例
 * @pipe 管子的实例
 * @land 背景的实例
 * @mountain 背景的实例
 **/
function Game(ctx, bird, pipe, land, mountain) {
	this.ctx = ctx;
	this.bird = bird;
	// 由于管子有多根，所以存储在数组中
	this.pipeArr = [pipe];
	this.land = land;
	this.mountain = mountain;
	this.timer = null;
	this.iframe = null;
	
	this.init();
}
// 初始化的方法
Game.prototype.init = function() {
	// 执行start方法
	this.start();
	this.bindEvent();
}

//渲染山
Game.prototype.renderMountain = function(){
	var img = this.mountain.img;
	//改变图canvas中的x点
	this.mountain.x -= this.mountain.step;
	//判断边界
	if(this.mountain.x < -img.width){
		this.mountain.x = 0;
	}

	//绘制图片
	this.ctx.drawImage(img,this.mountain.x, this.mountain.y);
	this.ctx.drawImage(img,this.mountain.x + img.width,this.mountain.y);
	this.ctx.drawImage(img,this.mountain.x + img.width * 2,this.mountain.y);
}

// 渲染地面
Game.prototype.renderLand = function() {
	// 获取图片
	var img = this.land.img;
	// 改变图片在canvas中的x点
	this.land.x -= this.land.step;
	// 边界判断
	if (this.land.x < -img.width) {
		this.land.x = 0;
	}

	// 绘制图片
	this.ctx.drawImage(img, this.land.x, this.land.y);
	this.ctx.drawImage(img, this.land.x + img.width, this.land.y);
	this.ctx.drawImage(img, this.land.x + img.width * 2, this.land.y);
}
//渲染鸟
Game.prototype.renderBird = function(){
	//获取鸟的图片
	var img = this.bird.img;
	//保存状态
	this.ctx.save();
	//平移坐标系
	this.ctx.translate(this.bird.x, this.bird.y);
	//绘制矩形 // +5 -10 手动调整矩形宽高的大小
	// this.ctx.strokeRect(-this.bird.img.width / 2 + 5, -this.bird.img.height / 2, this.bird.img.width - 10, this.bird.img.height - 10);
	var deg = this.bird.state === "D" ? Math.PI / 180 * this.bird.speed : -Math.PI / 180 * this.bird.speed;
	// 旋转
	this.ctx.rotate(deg);
	///绘制图片
	this.ctx.drawImage(img, -img.width / 2, -img.height / 2);
	//恢复状态
	this.ctx.restore();
}
//清屏
Game.prototype.clear = function(){
	this.ctx.clearRect(0,0,360,521);
}
//游戏开始
Game.prototype.start = function(){
	// 缓存this
	var me = this;
	this.timer = setInterval(function(){
		//帧自加
		me.iframe ++;
		//清屏
		me.clear()
		me.checkPX();
		//渲染山
		me.renderMountain();
		// 渲染地面
		me.renderLand();
		// 渲染鸟
		me.renderBird();
		if (!(me.iframe % 10)) {
			// 鸟飞翔
			me.bird.fly();
		}
		// 鸟下降
		me.bird.fallDown();
		// 管子的移动
		me.movePipe();
		// 渲染管子
		me.renderPipe();
		// 每移动65次创建一根管子
		if (!(me.iframe % 65)) {
			// 创建管子
			me.createPipe();
		}
		// 清除管子
		me.clearPipe();
		// 渲染鸟的四个点
		me.renderBirdPoints();
		// 渲染管子的八个点
		me.renderPipePoints();
		// 碰撞检测
		// me.check();
	},30)
}

//绑定事件
Game.prototype.bindEvent = function(){
	//备份this
	var me = this;
	//为canvas绑定点击事件
	this.ctx.canvas.onclick = function(){
		// 调用鸟的上升方法
		me.bird.goUp();
	}
}

//渲染管子
Game.prototype.renderPipe = function(){
	//备份this
	var me = this;
	//由于管子存储在数组中 所以要循环渲染
	this.pipeArr.forEach(function(value){
		//获取上官子的图片
		var img = value.pipe_up;
		//img_x
		var img_x = 0;
		//img_y
		var img_y = img.height - value.up_height;
		//img_W
		var img_w = img.width;
		//img_h
		var img_h = value.up_height;
		//canvas_x
		var canvas_x = me.ctx.canvas.width - value.step * value.count;
		//canvas_y
		var canvas_y = 0;
		//canvas_w
		var canvas_w = img.width;
		//canvas_h
		var canvas_h = value.up_height;
		//绘制上管子图片
		me.ctx.drawImage(img, img_x, img_y, img_w, img_h, canvas_x, canvas_y, canvas_w, canvas_h);

		//获取下管子的图片
		var img_down = value.pipe_down;
		// img_x
		var img_down_x = 0;
		// img_y
		var img_down_y = 0;
		//img_w
		var img_down_w = img_down.width;
		//img_h
		var img_down_h = value.down_height;
		//canvas_x
		var canvas_down_x = me.ctx.canvas.width - value.step * value.count;
		//canvas_y
		var canvas_down_y = value.up_height + 150; 
		//canvas_w
		var canvas_down_w = img_down.width;
		//canvas_h
		var canvas_down_h = value.down_height;
		//绘制上管子的图片
		me.ctx.drawImage(img_down, img_down_x, img_down_y, img_down_w, img_down_h, canvas_down_x, canvas_down_y, canvas_down_w, canvas_down_h);
	})
}

//管子的移动
Game.prototype.movePipe = function(){
	this.pipeArr.forEach(function(value){
		value.count ++;
	})
}

//创建管子
Game.prototype.createPipe = function(){
	var pipe = this.pipeArr[0].createPipe();
	//将创建的管子放入数组中
	this.pipeArr.push(pipe);
}
//清除管子
Game.prototype.clearPipe = function(){
	//循环移除管子
	for(var i = 0;i < this.pipeArr.length; i ++){
		//获取一根管子
		var pipe = this.pipeArr[i];
		if(pipe.x - pipe.step * pipe.count < -pipe.pipe_width){
			// 移除当前项
			this.pipeArr.splice(i, 1);
			return;
		}
	}
}

//渲染小鸟的四个点
Game.prototype.renderBirdPoints = function(){
	//鸟的A点
	var Bird_A = {
		x:-this.bird.img.width / 2 + 5 + this.bird.x,
		y:-this.bird.img.height / 2 + 5 + this.bird.y
	}
	//鸟的B点
	var Bird_B = {
		x:Bird_A.x + this.bird.img.width - 10,
		y:Bird_A.y
	}
	//鸟的C点
	var Bird_C = {
		x:Bird_A.x,
		y:Bird_A.y + this.bird.img.height - 10
	}
	//鸟的D点
	var Bird_D = {
		x:Bird_B.x,
		y:Bird_C.y
	}

	//绘制矩形
	//开启路径
	this.ctx.beginPath();
	//移动画笔到某个位置
	this.ctx.moveTo(Bird_A.x, Bird_A.y);
	this.ctx.lineTo(Bird_B.x, Bird_B.y);
	this.ctx.lineTo(Bird_D.x, Bird_D.y);
	this.ctx.lineTo(Bird_C.x, Bird_C.y);
	//闭合路径
	this.ctx.closePath();
	//描边颜色
	this.ctx.strokeStyle = "red";
	//描边
	this.ctx.stroke();
}
//渲染管子的八个点
Game.prototype.renderPipePoints = function(){
	for(var i = 0;i < this.pipeArr.lengthh;i ++){
		//获取一个管子
		var pipe = this.pipeArr[i];
		//绘制管子上四个点 
		//管子A点
		var pipe_A = {
			x:pipe.x - pipe.step - pipe.count,
			y:0
		}
		//管子B点
		var pipe_B = {
			x:pipe_A.x + pipe.pipe_up.width,
			y:0
		}
		//管子C点
		var pipe_C = {
			x:pipe_A.x,
			y:pipe.up_height
		}
		//管子D点
		var pipe_D = {
			x:pipe_B.x,
			y:pipe_C.y
		}

		// 绘制上管子的四个点
		// 开启路径
		this.ctx.beginPath();
		//移动画笔到某个位置
		this.ctx.moveTo(pipe_A.x, pipe_A.y);
		this.ctx.lineTo(pipe_B.x, pipe_B.y);
		this.ctx.lineTo(pipe_D.x, pipe_D.y);
		this.ctx.lineTo(pipe_C.x, pipe_C.y);
		//闭合路径
		this.ctx.closePath();
		// 改变描边色
		this.ctx.strokeStyle = "blue";
		//描边
		this.ctx.stroke();

		//绘制下管子四个点
		// 管子的A点
		var pipe_down_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: pipe.up_height + 150
		}

		// 管子的B点
		var pipe_down_B = {
			x: pipe_down_A.x + pipe.pipe_up.width,
			y: pipe_down_A.y
		}

		// 管子的C点
		var pipe_down_C = {
			x: pipe_down_A.x,
			y: pipe_down_A.y + pipe.down_height
		}

		// 管子的D点
		var pipe_down_D = {
			x: pipe_down_B.x,
			y: pipe_down_C.y
		}


		// 绘制上管子的四个点
		// 开启路径
		this.ctx.beginPath();
		// 移动画笔到某个位置
		this.ctx.moveTo(pipe_down_A.x, pipe_down_A.y);
		this.ctx.lineTo(pipe_down_B.x, pipe_down_B.y);
		this.ctx.lineTo(pipe_down_D.x, pipe_down_D.y);
		this.ctx.lineTo(pipe_down_C.x, pipe_down_C.y);
		// 闭合路径
		this.ctx.closePath();
		// 改变描边色
		this.ctx.strokeStyle = "blue";
		// 描边
		this.ctx.stroke();
	}
}

//碰撞检测
Game.prototype.check = function(){
	for(var i = 0 ; i < this.pipeArr.length;i ++){
		// 获取一根管子
		var pipe = this.pipeArr[i];
		// 绘制上管子的四个点
		// 管子的A点
		var pipe_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: 0
		}

		// 管子的B点
		var pipe_B = {
			x: pipe_A.x + pipe.pipe_up.width,
			y: 0
		}

		// 管子的C点
		var pipe_C = {
			x: pipe_A.x,
			y: pipe.up_height
		}

		// 管子的D点
		var pipe_D = {
			x: pipe_B.x,
			y: pipe_C.y
		}

		// 绘制下管子的四个点
		// 管子的A点
		var pipe_down_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: pipe.up_height + 150
		}

		// 管子的B点
		var pipe_down_B = {
			x: pipe_down_A.x + pipe.pipe_up.width,
			y: pipe_down_A.y
		}

		// 管子的C点
		var pipe_down_C = {
			x: pipe_down_A.x,
			y: pipe_down_A.y + pipe.down_height
		}

		// 管子的D点
		var pipe_down_D = {
			x: pipe_down_B.x,
			y: pipe_down_C.y
		}

		// 鸟的A点
		var Bird_A = {
			x: -this.bird.img.width / 2 + 5 + this.bird.x,
			y: -this.bird.img.height / 2 + 5 + this.bird.y
		}

		// 鸟的B点
		var Bird_B = {
			x: Bird_A.x + this.bird.img.width - 10,
			y: Bird_A.y
		}

		// 鸟的C点
		var Bird_C = {
			x: Bird_A.x,
			y: Bird_A.y + this.bird.img.height - 10
		}

		// 鸟的D点
		var Bird_D = {
			x: Bird_B.x,
			y: Bird_C.y
		}

		//用Bird_B点和上管子C点进行比较
		if(Bird_B.x >= pipe_C.x && Bird_B.y <= pipe_C.y && Bird_A.x <= pipe_D.x){
			console.log("撞上管子");
			this.gameOver();
		}
		//用Bird_D点和下管子A点进行比较
		if(Bird_D.x >= pipe_down_A.x && Bird_D.y >= pipe_down_A.y && Bird_A.x <= pipe_down_D.x){
			console.log("撞下管子");
			this.gameOver();
		}
	}
}

Game.prototype.gameOver = function() {
	clearInterval(this.timer);
}

//像素检测
Game.prototype.checkPX = function() {
	// 清屏
	this.ctx.clearRect(0, 0, 360, 512);
	// 保存状态
	this.ctx.save();
	// 渲染管子
	this.renderPipe();
	// 改变融合方式
	this.ctx.globalCompositeOperation = "source-in";
	// 渲染鸟
	this.renderBird();
	// 恢复状态
	this.ctx.restore();

	// 获取像素信息
	var imgData = this.ctx.getImageData(0, 0, 360, 512);
	for (var i = 0; i < imgData.data.length; i++) {
		if (imgData.data[i]) {
			console.log("撞了");
			this.gameOver();
			return;
		}
	}
}