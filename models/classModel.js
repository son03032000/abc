const mongoose = require("./dbConnect");

const ClassSchema = mongoose.Schema(
  {
    className: String,
    thumbnail: { type: String, default: "" },
  },
  { collection: "class" }
);

const ClassModel = mongoose.model("class", ClassSchema);

module.exports = ClassModel;
