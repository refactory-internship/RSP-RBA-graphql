const express = require('express');
const { Sequelize } = require('sequelize');
const DB = require('./src/config/database')
const routes = require('./src/routes')
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./src/data/schema');
const resolvers = require('./src/data/resolvers');
const { verifyToken } = require('./src/middleware/auth');
require('dotenv').config();

const app = express();
const port = process.env.PORT || '3000';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const sequelize = new Sequelize(DB.development)

//Test database connection
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        //get user token from header
        const token = req.headers.authorization || '';
        //retrieve user with the token
        const { user, loggedIn } = verifyToken(token);
        return { user, loggedIn }
    }
});
server.applyMiddleware({ app, path: '/rsp-graphql' });

app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
})
