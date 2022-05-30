const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Grado = require('../models/gradeModel')
var jwt = require("../services/jwt");

router.route('/getUsers').get((req, res)=>{
    User.findAll({
        include: {
            model: Grado,
            attributes: ['nombre', 'seccion']
        }
    }).then(result=>{
        res.json(result);
    });
});

router.route('/getUser/:id').get((req, res)=>{
    User.findByPk(req.params.id).then(result=>{
        res.json(result)
    });
});

router.route('/addUser').post((req, res)=>{
    User.create({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        sexo: req.body.sexo,
        edad: req.body.edad,
        username: req.body.username,
        contrasenia: req.body.contrasenia,
        email: req.body.email,
        roll: req.body.roll,
        id_grado: req.body.id_grado
    }).then(post=>{
        res.json(post);
    });
});

router.route('/updateUser/:id').put((req, res)=>{
    User.update({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        sexo: req.body.sexo,
        edad: req.body.edad,
        username: req.body.username,
        contrasenia: req.body.contrasenia,
        email: req.body.email,
        roll: req.body.roll,
        id_grado: req.body.id_grado
    }, {
        where:{
            id_usuario: req.params.id
        }
    }).then(result=>{
        res.json(result);
    });
});

router.route('/deleteUser/:id').delete((req, res)=>{
    User.destroy({
        where: {
            id_usuario: req.params.id
        }
    }).then(result=>{
        res.json(result);
    });
});

router.route('/login').post((req, res)=>{
    User.findOne({
        where:{email: req.body.email, contrasenia: req.body.contrasenia}
    }).then(result=>{
        if(result != null){
            res.status(200).send({token: jwt.createToken(result), user: result})
        } else{
            res.status(404).send({message: "No existe el usuario"})
        }
    })
})
module.exports = router;