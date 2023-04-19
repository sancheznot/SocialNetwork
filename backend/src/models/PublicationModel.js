const { Schema, model } = require("mongoose");

const PublicationsSchema = Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  file: String,
  created_At: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Publication", PublicationsSchema);
