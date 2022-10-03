export class GrayscaleImage {
  static events = []
  start(canvas, data) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.colorImage = new Image();
    this.colorImage.src = "./EmbedProjects/GrayscaleImage/color.jpg";
    this.colorImage.width = 500;
    this.colorImage.height = 375;
    let loadedImage = (e) => {
      this.context.drawImage(this.colorImage, 0, 0);
      this.grayImage = [];
      // this.grayImage = new Uint8ClampedArray(); <----------------- 
      this.colorImage.data = this.context.getImageData(0, 0, 200, 200).data;
      console.log(this.colorImage.data);
      
      for(let i = 0; i < 200 * 200 * 4; i+=4){
          let color = 
            0.299 * this.colorImage.data[i] + 
            0.587 * this.colorImage.data[i + 1] + 
            0.114 * this.colorImage.data[i + 2];
          this.grayImage.push(Math.round(color));
      }
    };
    GrayscaleImage.events.push(loadedImage);
    this.colorImage.addEventListener("load", [...GrayscaleImage.events].pop(), false);
  }
  refresh(canvas, data) {
    // this.grayImage = 0.299R + 0.587G + 0.114B
  }
  draw(canvas, data) {
    if(this.grayImage == undefined) return;
    this.context.drawImage(this.colorImage, 0, 0);
    let iter = 0;
    for(let i = 0; i < 200; i++){
      for(let j = 0; j < 200; j++){
        this.context.fillStyle = `rgb(
          ${this.grayImage[iter]},
          ${this.grayImage[iter]},
          ${this.grayImage[iter]}
        )`;
        this.context.fillRect(j, i + 375, 1, 1);
        iter++;
      }
    }
    // this.context.drawImage(this.grayImage, 0, 0);
  }
}
