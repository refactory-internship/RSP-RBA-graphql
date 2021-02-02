require('dotenv').config()

module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: null,
    database: process.env.MYSQL_DATABASE,
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  },
  test: {
    username: "root",
    password: "null",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: "null",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
