const express = require("express");
require("./database/config").connect();
const app = express();
const routes = require("./routes/route");

const { Question, Topic } = require("./model/model");
const { getEventListeners } = require("events");
mongoose.connect(
  "mongodb://localhost:27017/pencilDB",
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("sucessfully connected to database");
  }
);

app.use("/", routes);
app.listen("4200", () => {
  console.log("sucesson conneting to 4200");
});
