const express = require('express');
const router = express.Router();

// index va a tener dos finalidades
// 1. la pagina index
// 2. organizar el resto de nuestras rutas

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


const bookRouter = require("./book.routes.js")
router.use("/book", bookRouter)




module.exports = router;
