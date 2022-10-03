export class GrayscaleImage {
  static events = [];
  start(canvas, data) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.colorImage = new Image();
    this.colorImage.src = "./EmbedProjects/GrayscaleImage/color.jpg";
    this.isLoaded = false;
    // this.colorImage.width = 500;
    // this.colorImage.height = 375;
    let loadedImage = (e) => {
      this.context.drawImage(this.colorImage, data.xFixed, data.yFixed);

      const colorImageCArray = this.context.getImageData(
        data.xFixed,
        data.yFixed,
        this.colorImage.width,
        this.colorImage.height
      ).data;
      
      // make it gray
      const grayImageCArray = new Uint8ClampedArray(colorImageCArray.length);
      for (let i = 0; i < grayImageCArray.length; i += 4) {
        let color =
          0.299 * colorImageCArray[i] + 0.587 * colorImageCArray[i + 1] + 0.114 * colorImageCArray[i + 2];
        grayImageCArray.set([Math.round(color), Math.round(color), Math.round(color), 255], i);
      }
      
      // average color
      this.AVG = {
        RAvg: 0, 
        GAvg: 0, 
        BAvg: 0
      }
      for (let i = 0; i < colorImageCArray.length; i += 4) {
        this.AVG.RAvg += colorImageCArray[i];
        this.AVG.GAvg += colorImageCArray[i + 1];
        this.AVG.BAvg += colorImageCArray[i + 2];
      }
      this.AVG.RAvg = this.AVG.RAvg / (colorImageCArray.length / 4);
      this.AVG.GAvg = this.AVG.GAvg / (colorImageCArray.length / 4);
      this.AVG.BAvg = this.AVG.BAvg / (colorImageCArray.length / 4);

      function getAvgColor(x, y, rowLength){ // all in pixels
        x = x * 4;
        y = y * 4;
        const AVG = [];
        // const AVG = {
        //   RAvg: 0, 
        //   GAvg: 0, 
        //   BAvg: 0
        // }
        for (let i = 0; i < colorImageCArray.length / rowLength; i += 4) {
          for(let j = 0; j < rowLength; j++){
            colorImageCArray[i * 4 + j]                                         //#### #### #### #### #### ####
            
          }                                                                     //#### #### #### 
        }                                                                       //#### #### ####        
      }
      console.log(getAvgColor(10, 5, 500));


      
      this.grayImageData = new ImageData(grayImageCArray, this.colorImage.width);
      this.colorImageData = new ImageData(colorImageCArray, this.colorImage.width);
      
      this.isLoaded = true;
    };
    GrayscaleImage.events.push(loadedImage);
    this.colorImage.addEventListener("load", [...GrayscaleImage.events].pop(), false);
  }
  refresh(canvas, data) {}
  draw(canvas, data) {
    if (!this.isLoaded) return;
    this.context.putImageData(this.colorImageData, data.xFixed, data.yFixed);
    this.context.putImageData(this.grayImageData, data.xFixed, this.colorImage.height + data.yFixed);
    this.context.fillStyle = `rgb(
      ${Math.round(this.AVG.RAvg)},
      ${Math.round(this.AVG.GAvg)},
      ${Math.round(this.AVG.BAvg)}
    )`
    this.context.fillRect(this.colorImage.width, 0, this.colorImage.width, this.colorImage.height)
  }
}
