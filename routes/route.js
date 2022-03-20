const express = require("express");
const router = express.Router();
const fs = require("fs");

const {
  createTopicsDb,
  createQuestionDb,
  getQuestions,
  updateTopicNamebyNameHandler,
  getQuestionswithOneQuery,
} = require("./controller");

//create Topics db
router.get("/read", async (req, res) => {
  fs.createReadStream("./puplic/uploads/topics.csv", { encoding: "utf-8" })
    .on("data", async (chunk) => {
      try {
        const topics = await createTopicsDb(chunk);
        res.json(topics);
      } catch (e) {
        res.json(e);
      }
    })
    .on("error", (error) => {
      console.log(error);
    });
});
//create QuestionsDB
router.get("/questions", async (req, res) => {
  fs.createReadStream("./puplic/uploads/p.csv", { encoding: "utf-8" })
    .on("data", async (chunk) => {
      try {
        const questinos = await createQuestionDb(chunk, "2");
        res.json(questinos);
      } catch (e) {
        res.json(e);
      }
    })
    .on("error", (error) => {
      console.log(error);
    });
});

//main function
router.get("/search", async (req, res) => {
  const name = req.query.q;

  const numbers = await getQuestions(name);
  res.json(numbers);
});

///updating Topics tree nomes when changing node name
router.get("/updateName", async (req, res) => {
  try {
    const { prevName, name } = req.query;
    const topic = updateTopicNamebyNameHandler(prevName, name);
    res.status(200).send("succefully updated topic");
  } catch (e) {
    res.status(400).send("error updationg topic");
  }
});

module.exports = router;
