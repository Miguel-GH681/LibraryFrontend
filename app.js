const express = require('express');
const bodyP = require('body-parser');
const cors = require('cors');
const sequelize = require('./connectiondb/connection');
var gradeRoutes = require('./routes/gradeRoutes');
var userRoutes = require('./routes/userRoutes');
var genreRoutes = require('./routes/genreRoutes');
var bookRoutes = require('./routes/bookRoutes');
var lendBookRoutes = require('./routes/lendBookRoutes');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyP.json());
app.use(bodyP.urlencoded({extended: true}));
app.use(cors());

app.get('/', function(req, res){
    res.json("hola mundo");
})

app.use('/api', gradeRoutes, userRoutes, genreRoutes, bookRoutes, lendBookRoutes);

app.listen(PORT, function(){
    console.log('La app ha arrancado...');
    sequelize.authenticate().then(()=>{
        console.log('Se ha realizado la conexión a la base de datos');
    }).catch(error=>{
        console.log('Se ha producido un error', error)
    })
})

