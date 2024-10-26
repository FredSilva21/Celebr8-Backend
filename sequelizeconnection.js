const { Sequelize } = require("sequelize")

const db_name =  process.env.MySQL_DB_NAME
const db_user =  process.env.MySQL_DB_USER
const db_password =  process.env.MySQL_DB_PASSWORD
const db_host = process.env.MySQL_DB_HOST
const db_dialect = 'mysql'

const sequelize = new Sequelize( db_name, db_user, db_password, {
    host: db_host,
    dialect: db_dialect
});

module.exports = sequelize