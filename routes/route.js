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
      const topics = await createTopicsDb(chunk);
      console.log(topics);
    })
    .on("error", (error) => {
      console.log(error);
    });
});
//create QuestionsDB
router.get("/questions", async (req, res) => {
  fs.createReadStream("./puplic/uploads/p.csv", { encoding: "utf-8" })
    .on("data", async (chunk) => {
      const questinos = await createQuestionDb(chunk);
      console.log(questions);
    })
    .on("error", (error) => {
      console.log(error);
    });
});
//crete one query question db
router.get("/one-questions", async (req, res) => {
  fs.createReadStream("./puplic/uploads/p.csv", { encoding: "utf-8" })
    .on("data", async (chunk) => {
      console.log(chunk);
      const questinos = await createQuestionDb(chunk, "one");
      console.log(questinos);
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
/// oneQuery Search
router.get("/one-query-search", async (req, res) => {
  const name = req.query.q;

  const numbers = await getQuestionswithOneQuery(name);
  res.json(numbers);
});

///test for updating Topics tree nomes when changing node name
router.get("/updateName", async (req, res) => {
  try {
    const { preName, name } = req.query;
    const topic = updateTopicNamebyNameHandler(preName, name);
    res.status(200).send("succefully updated topic");
  } catch (e) {
    res.status(400).send("error updationg topic");
  }
});

module.exports = router;
