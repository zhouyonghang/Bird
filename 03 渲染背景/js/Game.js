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

	this.init();
}
// 初始化的方法
Game.prototype.init = function() {
	// 执行start方法
	this.start();
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

//清屏
Game.prototype.clear = function(){
	this.ctx.clearRect(0,0,360,521);
}
//游戏开始
Game.prototype.start = function(){
	// 缓存this
	var me = this;
	this.timer = setInterval(function(){
		//清屏
		me.clear()
		//渲染山
		me.renderMountain();
	},30)
}