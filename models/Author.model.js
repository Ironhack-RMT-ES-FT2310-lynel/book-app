const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
  name: String,
  yearBorn: Number,
  country: String
})

const Author = mongoose.model("Author", authorSchema)

module.exports = Author