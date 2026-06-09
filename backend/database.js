const { Sequelize } = require('sequelize'); 
const config = require('./config/config.js'); 

const dbConfig = config.development;
const nombreBD = dbConfig.database || 'usuarios'; 

const sequelizeSetup = new Sequelize({
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: false
});

const sequelize = new Sequelize(nombreBD, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: false
});

async function inicializarTodo() {   
  try { 

    await sequelize.authenticate();
    console.log(' CONEXION EXITOSA AL SERVIDOR DE BASE DE DATOS');

    

  } catch (error) {
    console.error('\n ERROR CRÍTICO EN EL PROCESO DE BASE DE DATOS:', error.message);
  }
}

inicializarTodo();
  
module.exports = sequelize;