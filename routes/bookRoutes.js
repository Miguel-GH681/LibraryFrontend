const express = require('express');
const router = express.Router();

const Book = require('../models/bookModel');
const Genero = require('../models/genreModel');

router.route('/getBooks').get((req, res)=>{
    Book.findAll({
        include: {
            model: Genero,
            attributes: ['nombre']
        }
    }).then(result=>{
        res.json(result);
    })
});

module.exports = router;
