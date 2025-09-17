const express = require("express");
const app = express();
const PORT = 8383;

let data = {
  name: "Hehee",
};

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <body
        style="background:pink;
    color:blue;">
    <h1>DATA:</h1>
    <p>${JSON.stringify(data)}</p>
    </body>
    `);
});

app.get("/dashboard", (req, res) => {
  console.log("Hitting dashboard endpoint");
  res.send("Dashboard Page");
});

app.get("/api/data", (req, res) => {
  console.log("This one is for data");
  res.send(data);
});

app.post("/api/data", (req, res) => {
  const newEntry = req.body;
  console.log(newEntry);
  res.sendStatus(201);
});

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));
