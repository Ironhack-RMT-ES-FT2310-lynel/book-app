const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  // author: {
  //   type: mongoose.Schema.Types.ObjectId, // esto será una relación
  //   ref: "Author" // el nombre interno del modelo para que Mongo busque en esa colección
  // } // * un author por libro
  author: [{
    type: mongoose.Schema.Types.ObjectId, // esto será una relación
    ref: "Author" // el nombre interno del modelo para que Mongo busque en esa colección
  }] // * multiples autores por libro
})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book