// cada nuevo archivo de rutas necesita DOS cosas:

// 1. crear un nuevo objeto de router
const express = require('express');
const router = express.Router();

const Book = require('../models/Book.model');

// GET "/book" => renderizar los titulos de los libros
router.get("/", async (req, res, next) => {
  try {
    const response = await Book.find().select({title: 1}) // solo el titulo
    // console.log(response)

    res.render("book/list.hbs", {
      allBooks: response
    })
  } catch(err) {
    next(err)
  }
})

// GET "/book/:bookId/details" => renderizar los detalles de un libro por su id
// ejemplo del URL => "/book/1234/details"
router.get("/:bookId/details", async (req, res, next) => {

  try {

    const response = await Book.findById(req.params.bookId)
    console.log(req.params.bookId)
    console.log(response)

    res.render("book/details.hbs", {
      oneBook: response
    })

  } catch(err) {
    next(err)
  }

})




// 2. debemos exportar el objeto de router
module.exports = router;