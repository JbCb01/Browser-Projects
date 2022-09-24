export class TicTacToe {
  context;
  xFixed;
  yFixed;
  image;
  grid;
  win;
  static events = [];
  start(canvas, data) {
    this.context = canvas.getContext("2d");
    this.xFixed = data.xFixed;
    this.yFixed = data.yFixed;
    this.image = new Image();
    this.grid = [...Array(3)].map((e) => Array(3).fill(null));
    this.win = false;
    let counter = 0, x, y;
    let clickHandler = (e) => {
      if(!this.focus) return;
      if (
        e.offsetX - this.xFixed < 0 || 
        e.offsetY - this.yFixed < 0 ||
        e.offsetX - this.xFixed > 608 ||
        e.offsety - this.yFixed > 608
      ) return;

      if (e.offsetX - this.xFixed <= 608) y = 2;
      if (e.offsetX - this.xFixed <= 404) y = 1;
      if (e.offsetX - this.xFixed <= 200) y = 0;

      if (e.offsetY - this.yFixed <= 608) x = 2;
      if (e.offsetY - this.yFixed <= 404) x = 1;
      if (e.offsetY - this.yFixed <= 200) x = 0;

      if (this.grid[x][y] !== null || this.win) return;

      this.grid[x][y] =
        ++counter % 2
          ? (this.image.src = "/EmbedProjects/TicTacToe/images/kolko.png")
          : (this.image.src = "/EmbedProjects/TicTacToe/images/krzyzyk.png");
      for (let i = 0; i < 3; i++) {
        if (
          this.grid[i][0] === this.grid[i][1] &&
          this.grid[i][0] === this.grid[i][2] &&
          this.grid[i][0] != null
        )
          this.win = true;
        if (
          this.grid[0][i] === this.grid[1][i] &&
          this.grid[0][i] === this.grid[2][i] &&
          this.grid[0][i] != null
        )
          this.win = true;
      }
      if (
        this.grid[0][0] === this.grid[1][1] &&
        this.grid[0][0] === this.grid[2][2] &&
        this.grid[0][0] != null
      )
        this.win = true;
      if (
        this.grid[0][2] === this.grid[1][1] &&
        this.grid[0][2] === this.grid[2][0] &&
        this.grid[0][2] != null
      )
        this.win = true;
    }
    TicTacToe.events.push(clickHandler);
    canvas.addEventListener('mousedown', [...TicTacToe.events].pop(), false);
  }
  draw(canvas, data) {
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, 608, 608);
    this.context.fillStyle = "#000000";
    this.context.fillRect(200, 0, 4, 608);
    this.context.fillRect(404, 0, 4, 608);
    this.context.fillRect(0, 200, 608, 4);
    this.context.fillRect(0, 404, 608, 4);
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j]) {
          this.image.src = this.grid[i][j];
          this.context.drawImage(this.image, j * 200 + j * 4, i * 200 + i * 4);
        }
      }
    }
  }
  refresh(canvas, data) {
    this.xFixed = data.xFixed;
    this.yFixed = data.yFixed;
    this.focus = data.focus;
    if (this.win) return "stop";
  }
}
