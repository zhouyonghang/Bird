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