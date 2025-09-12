//The address of this server connected t othe network is: http://localhost:8383
//URL -> http://localhost:8383
//IP -> 127.0.0.1:8383
const express = require("express");
const app = express();
const PORT = 8383;

console.log("Hello world!");

//HTTP Verbs && Routes (or paths)

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));
