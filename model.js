const mongoose = require("mongoose");
// const { getUpdatedAncestors } = require("./controller");

const topicSchema = mongoose.Schema({
  name: { type: String, index: true, unique: true },

  ancestors: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
      name: String,
    },
  ],
});

const questionSChema = mongoose.Schema({
  number: { type: Number, index: true, unique: true },
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      index: true,
    },
  ],
});
// Topic.pre("findOneAndUpdate", async (err, doc, next) => {});

// topicSchema.post("findOneAndUpdate", () => {
//   // const query = doc.getQuery();
//   // const update = doc.getUpdate().$set;

//   console.log(this).getQuery();
//   // try {
//   //   // const updated = await getUpdatedAncestors(query.name, update.name);
//   //   console.log(updated);
//   // } catch (e) {}
// });

topicSchema.pre("save", function (next) {
  const paths = this.modifiedPaths();
  if (paths.includes("name")) {
    this.isDocUpdated = true;
  }

  next();
});

topicSchema.post("save", async function (doc) {
  if (this.isDocUpdated) {
    console.log(mongoose.isValidObjectId(doc._id));
    const topics = await updateAllNames(doc._id, doc.name);
    console.log(topics);
  }
});

const Topic = mongoose.model("Topic", topicSchema);

const Question = mongoose.model("Question", questionSChema);

const updateAllNames = async (id, name) => {
  try {
    const topics = await Topic.updateMany(
      { "ancestors._id": id },
      { $set: { "ancestors.$.name": name } },
      { multi: true }
    );
    return topics;
  } catch (e) {
    return e;
  }
};

module.exports = {
  Topic,
  Question,
};
