const express = require('express');
const router = express.Router();
const Genre = require('../models/genreModel');

router.route('/getGenres').get((req, res)=>{
    Genre.findAll().then(result=>{
        res.json(result);
    });
});

router.route('/getGenre/:id').get((req, res)=>{
    Genre.findByPk(req.params.id).then(result=>{
        res.json(result);
    });
});

router.route('/addGenre').post((req, res)=>{
    Genre.create({
        nombre: req.body.nombre
    }).then(post =>{
        res.json(post);
    });
});

//PendienteUpdateGenre

//PendienteEliminarGenre

module.exports = router;

