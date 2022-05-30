const express = require('express');
const router = express.Router();
const Grade = require('../models/gradeModel');

router.route('/getGrades').get((req, res)=>{
    Grade.findAll().then(result=>{
        res.json(result);
    });
});

router.route('/getGrade/:id').get((req, res)=>{
    Grade.findByPk(req.params.id).then(post=>{
        res.json(post);
    });
});

router.route('/addGrade').post((req, res)=>{
    Grade.create({
        nombre: req.body.nombre,
        seccion: req.body.seccion
    }).then(post =>{
        res.json(post);
    })
});

router.route('/updateGrade/:id').put((req, res)=>{
    Grade.update({
        nombre: req.body.nombre,
        seccion: req.body.seccion
    },{
        where:{
            id_grado: req.params.id
        }
    }).then(result=>{
        res.json(result);
    })
})

router.route('/deleteGrade/:id').delete((req, res)=>{
    Grade.destroy({
        where: {
            id_grado: req.params.id
        }
    }).then(result=>{
        res.json(result)
    })
})

module.exports = router;