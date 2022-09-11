class InteractiveWindow {
  constructor(x, y, width, height, name) {
    InteractiveWindow.numInstances = (InteractiveWindow.numInstances || 0) + 1;
    this.id = InteractiveWindow.numInstances;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.name = name;
  }
}

window.onload = () => {
  const canvas = document.querySelector("#main-canvas");
  const context = canvas.getContext("2d");

  const iWindows = [];
  iWindows.push(new InteractiveWindow(200, 200, 200, 200, "Wellcome window"));
  iWindows.push(new InteractiveWindow(600, 700, 200, 200, "Wellcome window"));

  startWindowsEvents();

  let interval = setInterval(() => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    drawWindows();
  }, 10);

  function startWindowsEvents() {                                                     // ten kod jest kurwa kurwa kurwa chujowy jak kurwa nie wiem
    let remove;
    let setRemove = () => (remove = true);
    let kurwo;
    canvas.addEventListener("mousemove", kurwo = (e1) => checkMousePos(e1));
    canvas.addEventListener("mouseout", setRemove);
    canvas.addEventListener("mouseup", setRemove);
    canvas.addEventListener("mousedown", (e1) => {
      remove = false;
      for (let i = 0; i < iWindows.length; i++) {
        if (iWindows[i].option == "stay") continue;
        let block = iWindows[i];
        if (block.option === "move") {
          let blockOffsetX = e1.offsetX - block.x;
          let blockOffsetY = e1.offsetY - block.y;
          canvas.addEventListener("mousemove", function mousemoveHandler(e2) {
            if (remove) return canvas.removeEventListener("mousemove", mousemoveHandler);
            block.x = e2.offsetX - blockOffsetX;
            block.y = e2.offsetY - blockOffsetY;
          });
        } else if (block.option.startsWith("resize")) {
          canvas.removeEventListener("mousemove", kurwo);
          canvas.addEventListener("mousemove", function mousemoveHandler(e2) {
            if (remove) {
              canvas.removeEventListener("mousemove", mousemoveHandler);
              return canvas.addEventListener("mousemove", kurwo = (e1) => checkMousePos(e1));
            }

          })
        }
      }
    });
  }

  function checkMousePos(e) {
    console.log('s')
    for (let i = 0; i < iWindows.length; i++) {
      let temp = iWindows[i];
      if (
        temp.x >= e.offsetX ||
        temp.x + temp.width <= e.offsetX ||
        temp.y >= e.offsetY ||
        temp.y + temp.height <= e.offsetY
      ) {
        iWindows[i].option = "stay";
        continue;
      } else if (e.offsetX - temp.x <= 10) {
        iWindows[i].option = "resize-l"; // I might try with method used in tictactoe
        if (e.offsetY - temp.y <= 10) {
          iWindows[i].option = "resize-lt"; // resizing (top, down, left, right)
          document.body.style.cursor = "default";
        } else if (temp.y + temp.height - e.offsetY <= 10) {
          iWindows[i].option = "resize-ld";
          document.body.style.cursor = "sw-resize";
        }
      } else if (temp.x + temp.width - e.offsetX <= 10) {
        iWindows[i].option = "resize-r";
        if (e.offsetY - temp.y <= 10) iWindows[i].option = "resize-rt";
        else if (temp.y + temp.height - e.offsetY <= 10) iWindows[i].option = "resize-rd";
      } else if (e.offsetY - temp.y <= 10) {
        iWindows[i].option = "resize-t";
      } else if (temp.y + temp.height - e.offsetY <= 10) {
        iWindows[i].option = "resize-d";
      } else {
        iWindows[i].option = "move";
        document.body.style.cursor = "nw-resize";
      }
      return;
    }
    document.body.style.cursor = "default";
  }
  function drawWindows() {
    context.fillStyle = "#FFFFFF";
    for (let i = 0; i < iWindows.length; i++) {
      context.fillRect(iWindows[i].x, iWindows[i].y, iWindows[i].width, iWindows[i].height);
    }
  }
};
