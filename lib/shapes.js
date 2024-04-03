class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new TypeError("Cannot construct Shape instances directly");
    }
  }

  setColor(color) {
    this.color = color;
  }

  setFontSize(fontSize) {
    this.fontSize = fontSize;
  }

  setFontColor(fontColor) {
    this.fontColor = fontColor;
  }

  setTextContent(textContent) {
    this.textContent = textContent;
  }

  setFontStrokeWidth(fontStrokeWidth) {
    this.fontStrokeWidth = fontStrokeWidth;
  }

  setFontStrokeColor(fontStrokeColor) {
    this.fontStrokeColor = fontStrokeColor;
  }
}

class Circle extends Shape {
  constructor(radius, color, fontSize, fontColor, textContent) {
    super();
    this.radius = radius ? radius : 400;
    this.color = color ? color : "red";
    this.fontSize = fontSize ? fontSize : 50;
    this.fontColor = fontColor ? fontColor : "black";
    this.textContent = textContent ? textContent : "";
    this.fontStrokeColor = "";
    this.fontStrokeWidth = "";
  }

  setRadius(radius) {
    this.radius = radius;
  }

  render() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
    <circle cx="500" cy="500" r="${this.radius}" fill="${this.color}"/>
    <text x="50%" y="50%" text-anchor="middle" fill="${this.fontColor}" dy=".3em" stroke="${this.fontStrokeColor}" stroke-width="${this.fontStrokeWidth}" font-size="${this.fontSize}">${this.textContent}</text>
</svg>`;
  }
}

class Triangle extends Shape {
  constructor(
    base,
    height,
    equilateral,
    color,
    fontSize,
    fontColor,
    textContent
  ) {
    super();
    this.base = base ? base : null;
    this.height = height ? height : null;
    this.equilateral = equilateral ? equilateral : false;
    this.color = color ? color : "red";
    this.fontSize = fontSize ? fontSize : 50;
    this.fontColor = fontColor ? fontColor : "black";
    this.textContent = textContent ? textContent : "";
    this.fontStrokeColor = "";
    this.fontStrokeWidth = "";
  }

  setBase(base) {
    this.base = base;
  }

  setHeight(height) {
    this.height = height;
  }

  render() {
    if (this.equilateral) {
      console.log("Equilateral triangle");
      this.height = 0.85 * this.base;
    }
    //Center triangle
    const basePadding = 1000 - this.base;
    const heightPadding = 1000 - this.height;

    const halfBasePadding = basePadding / 2;
    const halfHeightPadding = heightPadding / 2;

    //This is horrible, unreadable
    //Disgusting number casts because otherwise this.base and this.height are sometimes (not always???) intrepreted as strings
    //I love javascript, it has no issues and typescript is not necessary
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
    <polygon points="500,${
      1000 - halfHeightPadding - Number(this.height)
    } ${halfBasePadding},${halfHeightPadding + Number(this.height)} ${
      halfBasePadding + Number(this.base)
    },${halfHeightPadding + Number(this.height)}" fill="${this.color}" />
    <text x="50%" y="56%" text-anchor="middle" fill="${
      this.fontColor
    }" dy="0.3em" stroke="${this.fontStrokeColor}" stroke-width="${
      this.fontStrokeWidth
    }" font-size="${this.fontSize}">${this.textContent}</text>
</svg>`;
  }
}

class Square extends Shape {
  constructor(sideLength, color, fontSize, fontColor, textContent) {
    super();
    this.width = sideLength ? sideLength : 400;
    this.height = sideLength ? sideLength : 400;
    this.color = color ? color : "red";
    this.fontSize = fontSize ? fontSize : 50;
    this.fontColor = fontColor ? fontColor : "black";
    this.textContent = textContent ? textContent : "";
    this.fontStrokeColor = "";
    this.fontStrokeWidth = "";
  }

  setSideLength(sideLength) {
    this.width = sideLength;
    this.height = sideLength;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  render() {
    const yPadding = 1000 - this.height;
    const halfYPadding = yPadding / 2;

    const xPadding = 1000 - this.width;
    const halfXPadding = xPadding / 2;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
    <rect x="${halfXPadding}" y="${halfYPadding}" width="${this.width}" height="${this.height}" fill="${this.color}" />
    <text x="50%" y="50%" text-anchor="middle" fill="${this.fontColor}" dy="0.3em" stroke="${this.fontStrokeColor}" stroke-width="${this.fontStrokeWidth}" font-size="${this.fontSize}">${this.textContent}</text>
</svg>`;
  }
}

export { Circle, Triangle, Square };
