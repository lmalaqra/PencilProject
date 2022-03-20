const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT;
require("./database/config").connect();
const app = express();
const routes = require("./routes/route");

app.use("/", routes);
app.listen(PORT, () => {
  console.log(`sucesson conneting to ${PORT}`);
});
