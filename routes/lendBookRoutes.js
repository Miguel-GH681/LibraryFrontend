const express = require('express');
const { QueryTypes } = require('sequelize');
const router = express.Router();
const LendBooks = require('../models/lendBookModel');
const User = require('../models/userModel');
const Book = require('../models/bookModel');
const mdAuth = require('../middleware/authenticated');

router.get('/getLendBooks', function(req, res){
    LendBooks.findAll({
        include: {
            model: User,
            attributes: ['nombres','apellidos','email', 'roll']
        }
    }).then(result=>{
        res.json(result);
    })
});

router.route('/addLendBook').post((req, res)=>{
    let idLibro = req.body.id_libro;
    let idUsuario = req.body.id_usuario;
    let fechaRetorno = req.body.fecha_retorno;
    let nota = req.body.nota;

    LendBooks.sequelize.query('execute sp_PrestamoLibro :id_libro, :id_usuario, :fecha_retorno, :nota;', {
        type: QueryTypes.INSERT,
        replacements: {id_libro: idLibro, id_usuario: idUsuario, fecha_retorno: fechaRetorno, nota: nota}
    }).then(result=>{
        res.json(result);
    }).catch(error=>{
        res.json(error);
    })
})

router.route('/deleteLendBook').post((req, res)=>{
    let idLibro = req.body.id_libro;
    let idUsuario = req.body.id_usuario;
    LendBooks.sequelize.query('execute sp_DevolucionLibro :id_libro, :id_usuario', {
        type: QueryTypes.INSERT,
        replacements: {id_libro: idLibro, id_usuario: idUsuario}
    }).then(result=>{
        res.json(result);
    }).catch(error=>{
        res.json(error)
    })
})

router.route('/getMyBooks/:id').get((req, res)=>{
    LendBooks.findAll({
        include: {
            model: Book,
            attributes: ['titulo', 'autores', 'paginas']
        },
        where:{id_usuario: req.params.id}
    }).then(result=>{
        if(result != null){
            res.json(result);
        }else{
            res.send({message: "Aún no tiene libros"})
        }
    })
})

module.exports = router;
