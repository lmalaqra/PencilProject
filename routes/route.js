const express = require("express");
const router = express.router();
const fs = require("fs");

const {
  createTopicsDb,
  createQuestionDb,
  getQuestions,
  updateTopicNamebyNameHandler,
} = require("./controller");

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
router.get("/search", async (req, res) => {
  const name = req.query.q;

  const numbers = await getQuestions(name);
  res.json(numbers);
});
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
