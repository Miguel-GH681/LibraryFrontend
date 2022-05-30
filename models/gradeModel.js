const { Model, DataTypes } = require('sequelize');
const connectiondb = require('../connectiondb/connection');

class gradeModel extends Model {}
gradeModel.init({
    id_grado: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: DataTypes.STRING,
    seccion: DataTypes.CHAR
    }, {
        sequelize: connectiondb,
        modelName: 'grado',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
})

module.exports = gradeModel;