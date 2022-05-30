const { Model, DataTypes } = require('sequelize');
const connectiondb = require('../connectiondb/connection');
var Grado = require('./gradeModel');

class userModel extends Model{}
userModel.init({
    id_usuario:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    sexo: DataTypes.CHAR,
    edad: DataTypes.STRING,
    username: DataTypes.STRING,
    contrasenia: DataTypes.STRING,
    fotografia: DataTypes.BLOB,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    roll: DataTypes.STRING,
    id_grado: DataTypes.INTEGER
    }, {
        sequelize: connectiondb,
        modelName: 'usuario',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
});

userModel.belongsTo(Grado, {foreignKey: "id_grado"});
Grado.hasMany(userModel, {foreignKey: "id_grado"});

module.exports = userModel;