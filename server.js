//Using 4 lines of code to  get server running with express

const express = require("express");
const app = express();
const PORT = 8383;

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));
