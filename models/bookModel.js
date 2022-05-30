const { Model, DataTypes } = require('sequelize');
const connectiondb = require('../connectiondb/connection');
const Genre = require('./genreModel');

class bookModel extends Model {}
bookModel.init({
    id_libro:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: DataTypes.STRING,
    autores: DataTypes.STRING,
    lanzamiento: DataTypes.DATEONLY,
    editorial: DataTypes.STRING,
    paginas: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    id_genero: DataTypes.INTEGER
    }, {
       sequelize: connectiondb,
       modelName: 'libro',
       freezeTableName: true,
       createdAt: false,
       updatedAt: false 
});

bookModel.belongsTo(Genre, {foreignKey: "id_genero"});
Genre.hasMany(bookModel, {foreignKey: "id_genero"});

module.exports = bookModel;