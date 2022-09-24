export class Snake {
  static events = [];
  start(canvas, data){
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.score = 0;
    this.state = 'in-game';
    const arena = {
      width: 500,
      height: 500,
      objects: {
        apples: {
          start() {
            this.x = [];
            this.y = [];
            this.new(0);
            this.new(1);
            this.new(2);
            this.new(3);
          },
          new(which){
            this.x[which] = Math.floor(Math.random() * 19);
            this.y[which] = Math.floor(Math.random() * 19);
            for (let i = 0; i < arena.objects.snake.body.length; i++) {
              if (
                arena.objects.snake.body[i][0] == this.x[which] &&
                arena.objects.snake.body[i][1] == this.y[which]
              ) {
                this.x[which] = Math.floor(Math.random() * 19);
                this.y[which] = Math.floor(Math.random() * 19);
                i--;
              }
            }
          }
        },
        snake: {
          start() {
            this.width = 25;
            this.height = 25;
            this.x = 0;
            this.y = 19;
            this.direction = "ArrowRight";
            this.directionPrevious = "ArrowRight";
            this.keyLocked = false;
            this.body = [[this.x, this.y]];
    
            // to fix!
            window.onkeydown = (e) => {
              if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) >= 0) e.preventDefault();
              if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) >= 0){
                if (this.keyLocked) return;
                if (this.direction == "ArrowRight" && e.key == "ArrowLeft") return;
                if (this.direction == "ArrowLeft" && e.key == "ArrowRight") return;
                if (this.direction == "ArrowDown" && e.key == "ArrowUp") return;
                if (this.direction == "ArrowUp" && e.key == "ArrowDown") return;
      
                this.direction = e.key;
                this.keyLocked = true;
              }
            }
          },
        }
      }
      
    }
    this.arena = arena;
    this.arena.objects.snake.start();
    this.arena.objects.apples.start();

  }
  refresh(canvas, data){
    if(this.state == 'game-over') return;
    if(!data.focus) return;
    
    const snake = this.arena.objects.snake;
    const apples = this.arena.objects.apples;
    
    if (snake.direction == "ArrowRight") snake.x++;
    if (snake.direction == "ArrowLeft") snake.x--;
    if (snake.direction == "ArrowDown") snake.y++;
    if (snake.direction == "ArrowUp") snake.y--;

    if (snake.x > 19 || snake.x < 0 || snake.y > 19 || snake.y < 0) {
      this.state = 'game-over';
      return this.draw();
    }

    for (let i = 0; i < snake.body.length; i++) {
      console.log(snake.body[i][0], snake.body[i][1], snake.x, snake.y);
      if (
        snake.body[i][0] == snake.x &&
        snake.body[i][1] == snake.y
      ) {

        this.state = 'game-over';
        return this.draw();
      }
    }

    for (let i = 0; i < apples.x.length; i++) {
      if (
        snake.x == apples.x[i] &&
        snake.y == apples.y[i]
      ) {
        snake.body.push([snake.x, snake.y]);
        this.score++;
        apples.new(i);
      }
    }
    if (!snake.body[snake.body.length]) {
      for (let i = 0; i < snake.body.length - 1; i++) {
        snake.body[i] = snake.body[i + 1];
      }
      snake.body[snake.body.length - 1] = [snake.x, snake.y];
    }

    snake.keyLocked = false;
  }
  draw(canvas, data){
    // background
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, 500, 500);
    // apples
    this.context.fillStyle = "#FF0000";
    for (let i = 0; i < this.arena.objects.apples.x.length; i++) {
      this.context.fillRect(
        this.arena.objects.apples.x[i] * 25,
        this.arena.objects.apples.y[i] * 25,
        25,
        25
      );
    }
    // snake 
    this.context.fillStyle = "#77FF11";
    for (let i = 0; i < this.arena.objects.snake.body.length; i++) {
      this.context.fillRect(
        this.arena.objects.snake.body[i][0] * 25,
        this.arena.objects.snake.body[i][1] * 25,
        25,
        25
      );
    }
  }
}