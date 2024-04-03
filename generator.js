import path from "path";
import { Circle, Triangle, Square } from "./lib/shapes.js";
import fs from "fs";
import { wrtieSVGtoHTML } from "./lib/writeSVGtoHTML.js";
import chalk from "chalk";

export async function createFile({
  type,
  definition,
  color,
  textContent,
  companyName,
  fontSize,
  fontStrokeColor,
  fontStrokeWidth,
}) {
  if (type !== "circle" && type !== "square" && type !== "triangle") {
    throw new Error("Invalid shape type");
  }

  let shape;
  switch (type) {
    case "circle":
      shape = new Circle(definition.radius);
      break;
    case "square":
      if (!definition.sideLength) {
        shape = new Square();
        shape.setHeight(definition.height);
        shape.setWidth(definition.width);
      } else {
        shape = new Square(definition.sideLength);
      }
      break;
    case "triangle":
      shape = new Triangle(
        definition.base,
        definition.height,
        definition.equilateral
      );
      break;
  }

  //Update common properties, I'm sure there is some better way to do this with the new Shape(definition), however I'm lazy
  if (definition.color) {
    shape.setColor(definition.color);
  } else if (color) {
    shape.setColor(color);
  }

  if (definition.fontSize) {
    shape.setFontSize(definition.fontSize);
  } else if (fontSize) {
    shape.setFontSize(fontSize);
  }

  if (definition.textContent) {
    shape.setTextContent(definition.textContent);
  } else if (textContent) {
    shape.setTextContent(textContent);
  } else if (companyName) {
    shape.setTextContent(companyName);
  }

  if (definition.fontColor) {
    shape.setFontColor(definition.fontColor);
  } else if (textContent) {
    shape.setFontColor(fontColor);
  }

  if (definition.fontStrokeColor) {
    shape.setFontStrokeColor(definition.fontStrokeColor);
  } else if (fontStrokeColor) {
    shape.setFontStrokeColor(fontStrokeColor);
  }

  if (definition.fontStrokeWidth) {
    shape.setFontStrokeWidth(definition.fontStrokeWidth);
  } else if (fontStrokeWidth) {
    shape.setFontStrokeWidth(fontStrokeWidth);
  }

  const fileContent = shape.render();

  const filePath = path.join(process.cwd(), "out");
  const fileName = `${type}-${
    companyName ? `${companyName}-logo` : "generated-logo"
  }.svg`;

  const fullFilePath = path.join(filePath, fileName);

  await fs.promises.writeFile(fullFilePath, fileContent);

  console.log(
    chalk.green(
      `File ${fileName} created successfully. View outputted file at ${chalk.white(
        fullFilePath
      )}`
    )
  );

  await wrtieSVGtoHTML(fileName);
}
