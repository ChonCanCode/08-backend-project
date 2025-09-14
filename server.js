const express = require("express");
const app = express();
const PORT = 8383;

console.log("Hello world!");

app.get("/", (req, res) => {
  console.log("Hit endpoint.");
});

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));
