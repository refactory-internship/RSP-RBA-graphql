const express = require('express');
const { Sequelize } = require('sequelize');
const DB = require('./src/config/database')
const routes = require('./src/routes')
const { ApolloServer, gql } = require('apollo-server-express');
const { verifyToken } = require('./src/middleware/auth');
const users = require('./src/data/users');
const roles = require('./src/data/roles');
const rooms = require('./src/data/rooms');
const bookings = require('./src/data/bookings');
const databaseConnection = require('./src/config/testDatabaseConnection');

const app = express();
const port = process.env.PORT || '3000';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const sequelize = new Sequelize(DB.development)

//Test database connection
databaseConnection(sequelize);

const typeDef = gql`
    type Query
`

const server = new ApolloServer({
    typeDefs: [typeDef, users.typeDefs, roles.typeDefs, rooms.typeDefs, bookings.typeDefs],
    resolvers: [users.resolvers, roles.resolvers, rooms.resolvers, bookings.resolvers],

    context: ({ req }) => {
        //get user token from header
        const token = req.headers.authorization || '';
        //retrieve user with the token
        const { user, loggedIn } = verifyToken(token);
        return { user, loggedIn }
    },
    introspection: true,
    playground: true
});
server.applyMiddleware({ app, path: '/rsp-graphql' });

app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
})
