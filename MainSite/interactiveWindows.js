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

  const interactiveWindows = [];
  interactiveWindows.push(new InteractiveWindow(200, 200, 200, 200, "Wellcome window"));

  startWindowsEvents();

  let interval = setInterval(() => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    drawWindows();
  }, 10);

  function startWindowsEvents() {
    canvas.addEventListener("mousedown", (e1) => {
      remove = false;
      let block;
      for (let i = 0; i < interactiveWindows.length; i++) {
        let temp = interactiveWindows[i];
        if (temp.x <= e1.offsetX && temp.x + temp.width >= e1.offsetX) {
          if (temp.y <= e1.offsetY && temp.y + temp.height >= e1.offsetY) {
            block = interactiveWindows[i];
          }
        }
      }
      if (block !== undefined) {
        console.log(block);
        let blockOffsetX = e1.offsetX - block.x;
        let blockOffsetY = e1.offsetY - block.y;
        canvas.addEventListener("mousemove", function mousemoveHandler(e2) {
          if (remove) return canvas.removeEventListener("mousemove", mousemoveHandler);

          // update block position
          block.x = e2.offsetX - blockOffsetX;
          block.y = e2.offsetY - blockOffsetY;
        });
      }
    });
    let remove;
    let setRemove = () => (remove = true);
    canvas.addEventListener("mouseout", setRemove);
    canvas.addEventListener("mouseup", setRemove);
  }

  function drawWindows() {
    context.fillStyle = "#FFFFFF";
    for (let i = 0; i < interactiveWindows.length; i++) {
      context.fillRect(
        interactiveWindows[i].x,
        interactiveWindows[i].y,
        interactiveWindows[i].width,
        interactiveWindows[i].height
      );
    }
  }
};
