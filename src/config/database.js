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
    username: "gpapngxnduncgq",
    password: "7be57bde318ce625afe31187651af2836324f671eb2b1a1a2a802efc75baa5ac",
    database: "d93qceuoq8dkof",
    host: "ec2-52-6-178-202.compute-1.amazonaws.com",
    dialect: "postgres",
    logging: false
  }
}
