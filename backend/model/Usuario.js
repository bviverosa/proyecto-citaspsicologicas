// Actualiza esta línea con el nuevo nombre:
const sequelize = require('../database.js'); 
const { DataTypes } = require('sequelize'); // Esta se queda igual porque sí es la librería

const Usuario = sequelize.define('Usuario', {
// ...
  usuario_id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true},
  nombre_usuario: {
    type: DataTypes.STRING
  },
    contrasena: {
    type: DataTypes.STRING
  },
}, { tableName: 'usuario' });

module.exports=Usuario;