const express = require("express");
const app = express();
const PORT = 8383;

let data = {
  name: "Hehee",
};

//Middleware
app.use(express.json());

//Type 1 - HTTP Endpoint
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

//Type 2 - API Endpoint (non visual)
app.get("/api/data", (req, res) => {
  console.log("This one is for data");
  res.send(data);
});

app.post("/api/data", (req, res) => {
  //somone wants to create a user (e.g. click sign up button)
  //the user clicks the sign up button after entering their credentials, and their brower is wired up to send out a network to request to the server to handle that action.
  const newEntry = req.body;
  console.log(newEntry);
  res.sendStatus(201);
});

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));
