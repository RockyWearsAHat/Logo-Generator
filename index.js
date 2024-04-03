import inquirer from "inquirer";

import { spawn } from "child_process";
import { createFile } from "./generator.js";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { wrtieSVGtoHTML } from "./lib/writeSVGtoHTML.js";

//Start the server to display the newly generated SVG, or exit the program
const startServer = () => {
  const server = spawn("npm", ["run", "startServer"], { cwd: process.cwd() });

  server.stdout.on("data", (data) => {
    if (data.toString().includes("Server is running on http://localhost:")) {
      const url = data.toString().split("Server is running on ")[1].trim();
      console.log(`Server is running on ${chalk.green(url)}`);
    } else {
      console.log(data.toString());
    }
  });

  const exit = () => {
    process.exit(0);
  };

  server.on("SIGINT", exit);
  server.on("SIGTERM", exit);
};

let shape = {
  definition: {},
};

console.clear();

const whatWouldYouLikeToDo = await inquirer.prompt([
  {
    name: "choice",
    message: chalk.blue("What would you like to do?"),
    type: "list",
    choices: ["Generate a new logo", "View a logo in browser"],
  },
]);

if (whatWouldYouLikeToDo.choice === "View a logo in browser") {
  const allLogos = await fs.promises.readdir(path.join(process.cwd(), "out"));

  const viewLogo = await inquirer.prompt([
    {
      name: "fileName",
      message: chalk.blue("What file would you like to view?"),
      type: "list",
      choices: allLogos,
    },
  ]);

  await wrtieSVGtoHTML(viewLogo.fileName);

  console.clear();
  console.log(chalk.blue("Starting server\n"));
  startServer();
} else {
  const whatShape = await inquirer.prompt([
    {
      name: "choice",
      message: chalk.blue("What shape would you like to generate?"),
      type: "list",
      choices: ["Circle", "Square", "Triangle"],
    },
  ]);

  shape.type = whatShape.choice.toLowerCase();

  switch (whatShape.choice) {
    case "Circle":
      const radius = await inquirer.prompt([
        {
          name: "radius",
          message: chalk.blue(
            "What is the radius of the circle? (Default: 400, Range 0-1000)"
          ),
          type: "input",
        },
      ]);
      shape.definition.radius = radius.radius;
      break;
    case "Square":
      const square = await inquirer.prompt([
        {
          name: "isSquare",
          message: chalk.blue("Is this rectangle a square? (Default: yes)"),
          type: "confirm",
        },
      ]);
      if (square.isSquare) {
        const sideLength = await inquirer.prompt([
          {
            name: "sideLength",
            message: chalk.blue(
              "What is the side length of the square? (Default: 400, Range 0-1000)"
            ),
            type: "input",
          },
        ]);
        if (sideLength.sideLength != "") {
          shape.definition.sideLength = sideLength.sideLength;
        } else {
          shape.definition.sideLength = 400;
        }
      } else {
        const height = await inquirer.prompt([
          {
            name: "height",
            message: chalk.blue(
              "What is the height of the rectangle? (Range 0-1000)"
            ),
            type: "input",
          },
        ]);
        const width = await inquirer.prompt([
          {
            name: "width",
            message: chalk.blue(
              "What is the width of the rectangle? (Range 0-1000)"
            ),
            type: "input",
          },
        ]);
        shape.definition.height = height.height;
        shape.definition.width = width.width;
      }
      break;
    case "Triangle":
      const base = await inquirer.prompt([
        {
          name: "base",
          message: chalk.blue(
            "What is the base of the triangle? (Range 0-1000)"
          ),
          type: "input",
        },
      ]);
      shape.definition.base = base.base;
      const equilateral = await inquirer.prompt([
        {
          name: "equilateral",
          message: chalk.blue("Is the triangle equilateral? (Default: yes)"),
          type: "confirm",
        },
      ]);
      if (equilateral.equilateral) {
        shape.definition.equilateral = equilateral.equilateral;
      } else {
        const height = await inquirer.prompt([
          {
            name: "height",
            message: chalk.blue(
              "What is the height of the triangle? (Range 0-1000)"
            ),
            type: "input",
          },
        ]);
        shape.definition.height = height.height;
      }
      break;
  }

  const color = await inquirer.prompt([
    {
      name: "color",
      message: chalk.blue(
        "What is the color of the shape? (Default: red, Accepts any valid CSS color (e.g. #ffffff, rgb(255, 255, 255), white))"
      ),
      type: "input",
    },
  ]);

  shape.definition.color = color.color;

  const textContent = await inquirer.prompt([
    {
      name: "textContent",
      message: chalk.blue(
        "What text would you like to display on the shape? (Default is blank)"
      ),
      type: "input",
    },
  ]);

  shape.definition.textContent = textContent.textContent;

  const fontColor = await inquirer.prompt([
    {
      name: "fontColor",
      message: chalk.blue(
        "What is the color of the text? (Default: black, Accepts any valid CSS color (e.g. #ffffff, rgb(255, 255, 255), white))"
      ),
      type: "input",
    },
  ]);

  shape.definition.fontColor = fontColor.fontColor;

  const fontSize = await inquirer.prompt([
    {
      name: "fontSize",
      message: chalk.blue("What is the font size of the text? (Default: 50)"),
      type: "input",
    },
  ]);

  shape.definition.fontSize = fontSize.fontSize;

  const fontStrokeColor = await inquirer.prompt([
    {
      name: "fontStrokeColor",
      message: chalk.blue(
        "What is the color of the text stroke? (Default: none, Accepts any valid CSS color (e.g. #ffffff, rgb(255, 255, 255), white))"
      ),
      type: "input",
    },
  ]);

  shape.definition.fontStrokeColor = fontStrokeColor.fontStrokeColor;

  const fontStrokeWidth = await inquirer.prompt([
    {
      name: "fontStrokeWidth",
      message: chalk.blue(
        "What is the width of the text stroke? (Default: none, Range 0-Unknown, 10 is huge)"
      ),
      type: "input",
    },
  ]);

  shape.definition.fontStrokeWidth = fontStrokeWidth.fontStrokeWidth;

  const companyName = await inquirer.prompt([
    {
      name: "companyName",
      message: chalk.blue(
        "What is the name of the company? (Default: blank, File Naming Convention: <shape>-<companyName>-logo.svg)"
      ),
      type: "input",
    },
  ]);

  shape.companyName = companyName.companyName;

  await createFile(shape);

  console.clear();

  // #region Start Server
  const startServerOrExit = await inquirer.prompt([
    {
      name: "choice",
      message: chalk.blue("What would you like to do?"),
      type: "list",
      choices: [chalk.green("View In Webbrowser"), chalk.gray("Exit Program")],
    },
  ]);

  if (startServerOrExit.choice === chalk.green("View In Webbrowser")) {
    startServer();
  } else {
    process.exit(0);
  }
  // #endregion
}
