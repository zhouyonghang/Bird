// 管子类
function Pipe(pipe_up, pipe_down, step, x) {
	// 上管子的图片
	this.pipe_up = pipe_up;
	// 下管子的图片
	this.pipe_down = pipe_down;
	// 步长
	this.step = step;
	// 图片的x点
	this.x = x;
	//上管子的高度
	this.up_height = parseInt(Math.random() * 249) + 1;
	//下管子的高度
	this.down_height = 250 - this.up_height
	//定义计数器
	this.count = 0;
}