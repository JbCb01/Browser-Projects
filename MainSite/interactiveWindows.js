import { TicTacToe } from "./EmbedProjects/TicTacToe/main.js";
import { Snake } from "./EmbedProjects/Snake/main.js";

class InteractiveWindow {
  constructor(x, y, width, height, name) {
    InteractiveWindow.numInstances = (InteractiveWindow.numInstances || 0) + 1;
    this.id = InteractiveWindow.numInstances;
    this.x = x;
    this.y = y;
    this.width = width >= 100 ? width : 100;
    this.height = height >= 100 ? height : 100;
    this.name = name;
    this.focus;
  }
}
class EmbedCanvasWindow extends InteractiveWindow {
  #embed;
  constructor(x, y, width, height, name, embed, fps) {
    super(x, y, width, height, name);
    this.#embed = embed;
    this.fps = fps;
  }
  start(canvas, data) {
    const context = canvas.getContext("2d");
    context.transform(1, 0, 0, 1, this.x, this.y);
    this.#embed.start(canvas, data);
    context.transform(1, 0, 0, 1, -this.x, -this.y);
  }
  refresh(canvas, data) {
    const context = canvas.getContext("2d");
    context.transform(1, 0, 0, 1, this.x, this.y);
    this.#embed.refresh(canvas, data);
    context.transform(1, 0, 0, 1, -this.x, -this.y);
  }
  draw(canvas, data) {
    const context = canvas.getContext("2d");
    context.transform(1, 0, 0, 1, this.x, this.y);
    this.#embed.draw(canvas, data);
    context.transform(1, 0, 0, 1, -this.x, -this.y);
  }
}

window.onload = () => {
  const canvas = document.querySelector("#main-canvas");
  const context = canvas.getContext("2d");
  canvas.focus();

  const iWindows = [];
  iWindows.push(new EmbedCanvasWindow(800, 100, 608, 608, "Snake", new TicTacToe(), 7));
  iWindows.push(new EmbedCanvasWindow(100, 100, 608, 608, "Snake", new TicTacToe(), 7));


  const tools = {
    titleBarHeight: 20,
    titleBarButtonsWidth: 50,
    getData(i) {
      return {
        xFixed: iWindows[i].x,
        yFixed: iWindows[i].y,
        focus: iWindows[i].focus
      };
    },
    setBehavior(e) {
      document.body.style.cursor = "default";
      console.clear()
      console.log(iWindows[0]);
      console.log(iWindows[1]);
      for (let i = 0; i < iWindows.length; i++) {
        iWindows[i].option = "stay";
        iWindows[i].focus = false;
      }
      for (let i = 0; i < iWindows.length; i++) {
        if (
          iWindows[i].x + this.titleBarButtonsWidth <= e.offsetX &&
          iWindows[i].x + iWindows[i].width >= e.offsetX &&
          iWindows[i].y - this.titleBarHeight <= e.offsetY &&
          iWindows[i].y - 2 >= e.offsetY
        ) {
          iWindows[i].option = "move";
          iWindows[i].focus = true;
          document.body.style.cursor = "move";
          return;
        }
        if (
          iWindows[i].x <= e.offsetX &&
          iWindows[i].x + iWindows[i].width >= e.offsetX &&
          iWindows[i].y - this.titleBarHeight - 1 <= e.offsetY &&
          iWindows[i].y + iWindows[i].height >= e.offsetY
        ) {
          iWindows[i].focus = true;
          return;
        }
      }
    },
    setVisibility(e) {
      for (let i = 0; i < iWindows.length; i++) {
        if (
          iWindows[i].x <= e.offsetX &&
          iWindows[i].x + iWindows[i].width >= e.offsetX &&
          iWindows[i].y - this.titleBarHeight - 1 <= e.offsetY &&
          iWindows[i].y + iWindows[i].height >= e.offsetY
        ) {
          iWindows.unshift(iWindows.splice(i, 1)[0]);
          return;
        }
      }
    },
    drawiWindows() {
      for (let i = iWindows.length - 1; i >= 0; i--) {
        let iWindow = iWindows[i];

        context.fillStyle = "#000000";
        context.fillRect(
          iWindow.x - 1,
          iWindow.y - 22,
          iWindow.width + 2,
          iWindow.height + 23
        );

        context.fillStyle = "#FFFFFF";
        context.fillRect(
          iWindow.x,
          iWindow.y - this.titleBarHeight - 1,
          iWindow.width,
          this.titleBarHeight
        );
        context.fillStyle = "#FF3333";
        context.fillRect(iWindow.x + 5, iWindow.y - 16, 10, 10);
        context.fillStyle = "#FFBB33";
        context.fillRect(iWindow.x + 20, iWindow.y - 16, 10, 10);
        context.fillStyle = "#33FF33";
        context.fillRect(iWindow.x + 35, iWindow.y - 16, 10, 10);

        this.drawProject(iWindow);
      }
    },
    startWindowsEvents() {
      let remove;
      let setRemove = () => (remove = true);
      canvas.addEventListener("mousemove", (e1) => tools.setBehavior(e1), false);
      canvas.addEventListener("mouseout", setRemove, false);
      canvas.addEventListener("mouseup", setRemove, false);
      canvas.addEventListener("mousedown", (e1) => {
        tools.setVisibility(e1);
        remove = false;
        for (let i = 0; i < iWindows.length; i++) {
          let block = iWindows[i];
          if (block.option === "stay") continue;
          if (block.option === "move") {
            let blockOffsetX = e1.offsetX - block.x;
            let blockOffsetY = e1.offsetY - block.y;
            canvas.addEventListener("mousemove", function mousemoveHandler(e2) {
              if (remove)
                return canvas.removeEventListener("mousemove", mousemoveHandler);
              block.x = e2.offsetX - blockOffsetX;
              block.y = e2.offsetY - blockOffsetY;
            });
          }
        }
      }, false);
    },
    startProjects() {
      for (let i = iWindows.length - 1; i >= 0; i--) {
        if (iWindows[i] instanceof EmbedCanvasWindow) {
          iWindows[i].start(canvas, this.getData(i));
        }
      }
    },
    refreshProjects() {
      for (let i = iWindows.length - 1; i >= 0; i--) {
        if (iWindows[i] instanceof EmbedCanvasWindow) {
          iWindows[i].refresh(canvas, this.getData(i));
        }
      }
    },
    drawProject(iWindow) {
      if (iWindow instanceof EmbedCanvasWindow) {
        iWindow.draw(canvas, this.getData(iWindows.indexOf(iWindow)));
      }
    },
  };

  tools.startWindowsEvents();
  tools.startProjects();

  let frames = 0;
  let interval = setInterval(() => {
    frames++;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    tools.refreshProjects();
    tools.drawiWindows();
  }, 10);
};
