// cada nuevo archivo de rutas necesita DOS cosas:

// 1. crear un nuevo objeto de router
const express = require('express');
const router = express.Router();

const Book = require('../models/Book.model');
const Author = require("../models/Author.model.js")

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

    const response = await Book.findById(req.params.bookId).populate("author")
    // * populate es: busca el documento con el id de esta relacion, y devuelveme toda la informacion del documento. Lo que agregagamos dentro del populate es el nombre de propiedad que tiene una relación
    console.log(req.params.bookId)
    console.log(response)

    // const response2 = await Author.findById(response.author)
    // console.log(response2)

    res.render("book/details.hbs", {
      oneBook: response
    })

  } catch(err) {
    next(err)
  }

})


// GET "/book/create-form" => renderizar un formulario para crear libros
router.get("/create", async (req, res, next) => {

  try {

    const response = await Author.find().select({name: 1})

    res.render("book/add-form.hbs", {
      allAuthors: response
    })
  } catch(err) {
    next(err)
  }


})

// GET "/book/create-book" => crear el libro en la DB con la informacion del formulario y redireccionar al usuario
router.post("/create", (req, res, next) => {

  console.log(req.body)
  // req.body es un objeto que almacena y transmite data (json) en llamadas de tipo POST. LO QUE VIENE DEL FORMULARIO.

  // const { title, description, author } = req.body

  // 1. crear el libro con la info del req.body
  Book.create({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author
  })
  .then(() => {
    // 2. redireccionar al usuario a otra pagina
    res.redirect("/book")
  })
  .catch((err) => {
    next(err)
  })

})


// GET "/book/:bookId/edit" => renderizar formulario de editar un libro con la informacion actual
router.get("/:bookId/edit", async (req, res, next) => {

  try {
    // buscar los datos actuales de este libro y pasarlos a la renderización
    const bookToEdit = await Book.findById(req.params.bookId).populate("author")
    const allAuthors = await Author.find().select({name:1})
  
    res.render("book/edit-form.hbs", {
      // bookToEdit: bookToEdit
      bookToEdit,
      allAuthors
    })

  } catch(err) {
    next(err)
  }

})


// POST "/book/:bookId/edit" => edita el libro en la DB con a informacion del formulario y redirecciona al usuario
router.post("/:bookId/edit", async (req, res, next) => {

  // const {bookId} = req.params
  // const {title, description, author} = req.body
  
  try {
    
    // con destructuración
    // const response = await Book.findByIdAndUpdate(bookId, { title, description, author })

    // req.params.bookId
    // req.body
    // findByIdAndUpdate
    
    // sin destructuración
    const response = await Book.findByIdAndUpdate(req.params.bookId, {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author
    })

    res.redirect(`/book/${req.params.bookId}/details`)

  } catch (err) {
    next(err)
  }

})

// POST "/book/:bookId/delete" => borrar un libro por su id y redireccionar al usuario
router.post("/:bookId/delete", (req, res, next) => {

  console.log("borrando libro", req.params.bookId)
  Book.findByIdAndDelete(req.params.bookId)
  .then(() => {
    res.redirect("/book")
  })
  .catch((err) => {
    next(err)
  })
})


// 2. debemos exportar el objeto de router
module.exports = router;