import express from "express";
import path from "path";
import chalk from "chalk";

const app = express();
const port = 3000;

// Serve static files from the 'out' directory
app.use("/svgs", express.static(path.join(process.cwd(), "out")));
app.use("/css", express.static(path.join(process.cwd(), "css")));

// Serve display.html on all paths
app.get("*", (req, res) => {
  res.sendFile("display.html", { root: process.cwd() });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
