
//-------------------------------------------------------------------------------------------
//  RGBA
//-------------------------------------------------------------------------------------------

export function RGBA(r, g, b, a) {
  this.R = r;
  this.G = g;
  this.B = b;
  this.A = a;
}

RGBA.prototype.clone = function () {
  return new RGBA(this.R, this.G, this.B, this.A);
};


