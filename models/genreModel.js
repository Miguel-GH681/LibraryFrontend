const { Model, DataTypes } = require('sequelize');
const connectiondb = require('../connectiondb/connection');

class genreModel extends Model {}
genreModel.init({
    id_genero: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: DataTypes.STRING
}, {
    sequelize: connectiondb,
    modelName: 'genero',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

module.exports = genreModel;