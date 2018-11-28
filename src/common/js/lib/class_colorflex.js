import {RGBA} from "./RGBA";

export default class Color {
  constructor() {
    this.master = new RGBA(0, 0, 0, 0);
    this.highPass = new RGBA(0, 0, 0, 0);
    this.lowPass = new RGBA(0, 0, 0, 0);
  }

  fill(ctx, col) {
    ctx.fillStyle = this.processRGBA(col);
  };

  stroke(ctx, col) {
    ctx.strokeStyle = this.processRGBA(col);
  };

  fillRGBA(ctx, r, g, b, a) {
    ctx.fillStyle = this.processRGBA(new RGBA(r, g, b, a));
  };

  strokeRGBA(ctx, r, g, b, a) {
    ctx.strokeStyle = this.processRGBA(new RGBA(r, g, b, a));
  };

  string(col) {
    return this.processRGBA(col);
  };

  stringRGBA(r, g, b, a) {
    return this.processRGBA(new RGBA(r, g, b, a));
  };

  static blend(col1, col2, percent) {
    let r = col1.R + Math.round((col2.R - col1.R) * (percent / 100));
    let g = col1.G + Math.round((col2.G - col1.G) * (percent / 100));
    let b = col1.B + Math.round((col2.B - col1.B) * (percent / 100));
    let a = col1.A + ((col2.A - col1.A) * (percent / 100));
    return new RGBA(r, g, b, a);
  };

  static blend2(col1, col2, percent) {
    let p = percent / 100;
    let r = Math.floor(col1.R * (1 - p)) + Math.ceil(col2.R * p);
    let g = Math.floor(col1.G * (1 - p)) + Math.ceil(col2.G * p);
    let b = Math.floor(col1.B * (1 - p)) + Math.ceil(col2.B * p);
    let a = (col1.A * (1 - p)) + (col2.A * p);
    return new RGBA(r, g, b, a);
  };

  static darkerColor(col, darkness) {
    let r = Color.valueInRange(col.R - darkness, 0, 255);
    let g = Color.valueInRange(col.G - darkness, 0, 255);
    let b = Color.valueInRange(col.B - darkness, 0, 255);
    return new RGBA(r, g, b, col.A);
  };

  static lighterColor(col, lightness) {
    let r = Color.valueInRange(col.R + lightness, 0, 255);
    let g = Color.valueInRange(col.G + lightness, 0, 255);
    let b = Color.valueInRange(col.B + lightness, 0, 255);
    return new RGBA(r, g, b, col.A);
  };

//-------------------------------------------------------------------------------------------
//  PROCESSING / NORMALISING
//-------------------------------------------------------------------------------------------


// PASS R G B A //
  processRGBA(col, object) {

    // master color filter //
    let red = Math.round(col.R + this.master.R);
    let green = Math.round(col.G + this.master.G);
    let blue = Math.round(col.B + this.master.B);
    let alpha = col.A + this.master.A;

    // high & low pass color filters //
    let av = ((red + green + blue) / 3);
    let hp = av / 255;
    let lp = 1 - (av / 255);
    red += Math.round((this.highPass.R * hp) + (this.lowPass.R * lp));
    green += Math.round((this.highPass.G * hp) + (this.lowPass.G * lp));
    blue += Math.round((this.highPass.B * hp) + (this.lowPass.B * lp));


    // RANGE //
    red = Color.valueInRange(red, 0, 255);
    green = Color.valueInRange(green, 0, 255);
    blue = Color.valueInRange(blue, 0, 255);
    alpha = Color.valueInRange(alpha, 0, 1);

    if (object) {
      return new RGBA(red, green, blue, alpha);
    } else {
      // set to string //
      return Color.buildColour(red, green, blue, alpha);
    }

  };


  static buildColour(red, green, blue, alpha) {
    return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
  };


//-------------------------------------------------------------------------------------------
//  MATHS
//-------------------------------------------------------------------------------------------


  static valueInRange(value, floor, ceiling) {
    if (value < floor) {
      value = floor;
    }
    if (value > ceiling) {
      value = ceiling;
    }
    return value;
  };

  static getLuminosity(col) {
    return ((0.299 * col.R + 0.587 * col.G + 0.114 * col.B));
  };
}
