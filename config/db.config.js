const { Sequelize } = require("sequelize")

const db_name =  process.env.MySQL_DB_NAME || "celebr8"
const db_user =  process.env.MySQL_DB_USER || "root"
const db_password =  process.env.MySQL_DB_PASSWORD || "root"
const db_host = process.env.MySQL_DB_HOST   || "127.0.0.1"
const db_port = process.env.MySQL_DB_PORT || 3306
const db_dialect = 'mysql'

const sequelize = new Sequelize( db_name, db_user, db_password, db_port, {
    host: db_host,
    port: db_port,
    dialect: 'mysql',
});

module.exports = sequelize