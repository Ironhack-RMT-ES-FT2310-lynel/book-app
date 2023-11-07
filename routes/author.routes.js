const express = require('express');
const router = express.Router();

const Author = require("../models/Author.model.js")

// GET "/author/add-form" => mostrar formulario de crear
router.get("/add-form", (req, res, next) => {

  Author.find()
  .then((response) => {
    res.render("author/add-form.hbs", {
      allAuthors: response
    })
  })
  .catch((err) => {
    next(err)
  })

})

// POST "/author/create" => recibir los datos de crear un author y crearlo
router.post("/create", async (req, res, next) => {

  const { name, country, yearBorn } = req.body

  try {
    
    await Author.create( { name, country, yearBorn } )
    res.redirect("/author/add-form")

  } catch (err) {
    next(err)
  }

})


module.exports = router


