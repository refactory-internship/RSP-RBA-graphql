require('dotenv').config()

module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: "127.0.0.1",
    dialect: "postgres",
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
    dialect: "postgres",
    use_env_variable: "DATABASE_URL",
  }
}
