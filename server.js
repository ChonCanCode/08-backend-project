const express = require("express");
const app = express();
const PORT = 8383;

console.log("Hello world!");

app.get("/", (req, res) => {
  console.log("Hit endpoint.", req.method);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));
