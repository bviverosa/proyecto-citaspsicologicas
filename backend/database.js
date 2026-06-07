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
    await sequelizeSetup.query(`CREATE DATABASE IF NOT EXISTS \`${nombreBD}\`;`);
    await sequelizeSetup.close();

    await sequelize.authenticate();
    console.log(' CONEXION EXITOSA AL SERVIDOR DE BASE DE DATOS');

    const queryTabla = `
      CREATE TABLE IF NOT EXISTS usuario (
        usuario_id INT AUTO_INCREMENT PRIMARY KEY,
        nombre_usuario VARCHAR(255) NOT NULL,
        contrasena VARCHAR(255) NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `;
    await sequelize.query(queryTabla);
    console.log(' TABLA "usuario" CREADA EN MYSQL');

  } catch (error) {
    console.error('\n ERROR CRÍTICO EN EL PROCESO DE BASE DE DATOS:', error.message);
  }
}

inicializarTodo();
  
module.exports = sequelize;