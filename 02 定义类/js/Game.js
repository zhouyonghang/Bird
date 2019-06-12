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
}