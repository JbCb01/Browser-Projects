export const Snake = {
  game: {
    start(canvas) {
      this.canvas = canvas;
      this.context = this.canvas.getContext("2d");
      this.score = 0;
      this.arena.start();
      this.snake.start();
      this.arena.objects.apples.start();
      this.state = 'in-game';
    },
    updateAll() {
      if(this.state == 'game-over'){
        this.arena.objects.apples.update();
        this.snake.draw();
        return;
      }
      this.arena.update();
      this.snake.update();
      this.arena.objects.apples.update();
    },
    arena: {
      start() {
        this.context = Snake.game.context;
        this.width = 500;
        this.height = 500;
      },
      update() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillStyle = '#FFFFFF';
        this.context.fillRect(0, 0, this.width, this.height);
      },
      objects: {
        apples: {
          start() {
            this.context = Snake.game.context;
            this.width = 25;
            this.height = 25;
            this.x = [];
            this.y = [];
            this.new(0);
            this.new(1);
            this.new(2);
            this.new(3);
          },
          update() {
            this.context.fillStyle = "#FF0000";
            for (let i = 0; i < this.x.length; i++) {
              this.context.fillRect(
                this.x[i] * this.width,
                this.y[i] * this.height,
                this.width,
                this.height
              );
            }
          },
          new(which) {
            this.x[which] = Math.floor(Math.random() * 19);
            this.y[which] = Math.floor(Math.random() * 19);
            for (let i = 0; i < Snake.game.snake.body.length; i++) {
              if (
                Snake.game.snake.body[i][0] == this.x[which] &&
                Snake.game.snake.body[i][1] == this.y[which]
              ) {
                this.x[which] = Math.floor(Math.random() * 19);
                this.y[which] = Math.floor(Math.random() * 19);
                i--;
              }
            }
          },
        },
      },
    },
    snake: {
      start() {
        this.context = Snake.game.context;
        this.width = 25;
        this.height = 25;
        this.x = 0;
        this.y = 19;
        this.direction = "ArrowRight";
        this.directionPrevious = "ArrowRight";
        this.keyLocked = false;
        this.body = [[this.x, this.y]];
        this.length = this.body.length;

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
      update() {
        if (this.direction == "ArrowRight") this.x++;
        if (this.direction == "ArrowLeft") this.x--;
        if (this.direction == "ArrowDown") this.y++;
        if (this.direction == "ArrowUp") this.y--;

        if (this.x > 19 || this.x < 0 || this.y > 19 || this.y < 0) {
          Snake.game.state = 'game-over';
          return this.draw();
        }

        for (let i = 0; i < this.body.length; i++) {
          console.log(Snake.game.snake.body[i][0], Snake.game.snake.body[i][1], this.x, this.y);
          if (
            Snake.game.snake.body[i][0] == this.x &&
            Snake.game.snake.body[i][1] == this.y
          ) {

            Snake.game.state = 'game-over';
            return this.draw();
          }
        }

        let n = this.body.length;
        for (let i = 0; i < Snake.game.arena.objects.apples.x.length; i++) {
          if (
            this.x == Snake.game.arena.objects.apples.x[i] &&
            this.y == Snake.game.arena.objects.apples.y[i]
          ) {
            this.body.push([this.x, this.y]);
            Snake.game.score++;
            Snake.game.arena.objects.apples.new(i);
          }
        }
        if (!this.body[n]) {
          for (let i = 0; i < this.body.length - 1; i++) {
            this.body[i] = this.body[i + 1];
          }
          this.body[this.body.length - 1] = [this.x, this.y];
        }

        this.draw();
        this.keyLocked = false;
      },
      draw() {
        this.context.fillStyle = "#000000";
        for (let i = 0; i < this.body.length; i++) {
          this.context.fillRect(
            this.body[i][0] * this.width,
            this.body[i][1] * this.height,
            this.width,
            this.height
          );
        }
      },
    },
  },
  start(canvas) {
    this.game.start(canvas);
  },
  refresh() {
    this.game.updateAll();
  },
};
