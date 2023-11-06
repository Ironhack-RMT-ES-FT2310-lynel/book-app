const express = require('express');
const Book = require('../models/Book.model');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// GET "/book" => renderizar los titulos de los libros
router.get("/book", async (req, res, next) => {
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
router.get("/book/:bookId/details", async (req, res, next) => {

  try {

    const response = await Book.findById(req.params.bookId)
    console.log(req.params.bookId)
    console.log(response)

    res.render("book/details.hbs", {
      oneBook: response
    })

  } catch(err) {

  }

})



module.exports = router;
