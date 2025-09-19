const express = require("express");
const app = express();
const PORT = 8383;

let data = ["Hehee"];

app.use(express.json());

app.get("/", (req, res) => {
  console.log("User requested the home page website.");
  res.send(`
    <body
    style="background:pink;
    color:blue;">
    <h1>DATA:</h1>
    <p>${JSON.stringify(data)}</p>
    <a href="/dashboard">Dashboard</a>
    <script>console.log('This is my script')</script>
    </body>
    `);
});

app.get("/dashboard", (req, res) => {
  res.send(`
    <body
    style="background:pink;
    color:blue;">
    <h1>DASHBOARD</h1>
    <a href="/">Home</a>
    </body>
    `);
});

app.get("/api/data", (req, res) => {
  console.log("This one is for data");
  res.send(data);
});

app.post("/api/data", (req, res) => {
  const newEntry = req.body;
  console.log(newEntry);
  data.push(newEntry.name);
  res.sendStatus(201);
});

app.delete("/api/data", (req, res) => {
  data.pop();
  console.log("We deleted the element off the end of the array");
  res.sendStatus(203);
});

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));
