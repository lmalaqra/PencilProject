const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();
const {
  createTopicsDb,
  createQuestionDb,
  getQuestions,
} = require("./parseJson");
const { updateTopicNamebyName } = require("./services");

const { Question, Topic } = require("./model");
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
app.get("/", async (req, res) => {
  try {
    const topic = await Topic.updateOne(
      { name: "Cell surface membrane" },
      { $set: { name: "test topic 422" } }
    );
    res.json(topic);
  } catch (e) {
    console.log(e);
  }
});

app.get("/read", async (req, res) => {
  fs.createReadStream("topics.csv", { encoding: "utf-8" })
    .on("data", async (chunk) => {
      const topics = await createTopicsDb(chunk);
      console.log(topics);
    })
    .on("error", (error) => {
      console.log(error);
    });
});
app.get("/questions", async (req, res) => {
  fs.createReadStream("p.csv", { encoding: "utf-8" })
    .on("data", async (chunk) => {
      const questinos = await createQuestionDb(chunk);
      console.log(questions);
    })
    .on("error", (error) => {
      console.log(error);
    });
});
app.get("/search", async (req, res) => {
  const name = req.query.q;

  const numbers = await getQuestions(name);
  res.json(numbers);
});
app.get("/updateName", async (req, res) => {
  try {
    const { preName, name } = req.query;
    const topic = updateTopicNamebyName(preName, name);
    res.status(200).send("succefully updated topic");
  } catch (e) {
    res.status(400).send("error updationg topic");
  }
});
app.listen("4200", () => {
  console.log("sucesson conneting to 4200");
});
