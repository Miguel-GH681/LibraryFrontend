const { Model, DataTypes } = require('sequelize');
const connectiondb = require('../connectiondb/connection');

const User = require('./userModel');
const Book = require('./bookModel');

class lendBookModel extends Model{}
lendBookModel.init({
    id_prestamo:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha_salida: DataTypes.DATEONLY,
    fecha_retorno: DataTypes.DATEONLY,
    nota: DataTypes.STRING,
    id_usuario: DataTypes.INTEGER,
    id_libro: DataTypes.INTEGER
    }, {
        sequelize: connectiondb,
        modelName: 'prestamo',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
});

lendBookModel.belongsTo(User, {foreignKey:"id_usuario"});
User.hasMany(lendBookModel, {foreignKey: 'id_usuario'});

lendBookModel.belongsTo(Book, {foreignKey:"id_libro"});
Book.hasMany(lendBookModel, {foreignKey: 'id_libro'});

module.exports = lendBookModel;