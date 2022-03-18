const express = require("express");
require("./database/config").connect();
const app = express();
const routes = require("./routes/route");

app.use("/", routes);
app.listen("4200", () => {
  console.log("sucesson conneting to 4200");
});
