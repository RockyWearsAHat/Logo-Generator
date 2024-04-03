import fs from "fs";
import path from "path";

export async function wrtieSVGtoHTML(svgName) {
  try {
    if (!svgName) throw new Error("No SVG name provided");
    const filePath = path.join(process.cwd(), "display.html");
    const fileContents = await fs.promises.readFile(filePath, "utf8");

    const beginingOfSvgTag = fileContents.indexOf('<img src="/svgs/') + 16; //offset by character count of tag
    const endOfSvgTag = fileContents.indexOf('"', beginingOfSvgTag);

    const currentSVG = fileContents.substring(beginingOfSvgTag, endOfSvgTag);

    const newFileContents = fileContents.replace(currentSVG, svgName);

    await fs.promises.writeFile(filePath, newFileContents);
    return true;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
