const { gql } = require('apollo-server-express');

//Define the schema using GraphQL schema language
const typeDefs = gql`
    type Roles {
        id: Int!
        name: String!
        users: [User!]!
    }

    type User {
        id: Int!
        email: String!
        photo: String
        roles: Roles!
    }

    type Query {
        profile: User
        getUsers(id: Int!): User
        getRole(id: Int!): Roles
        getAllUsers: [User!]!
        getAllRoles: [Roles!]!
    }

    type Mutation {
        register (email: String!, password: String!): User!
        login(email: String!, password: String!): String!
    }
`

module.exports = typeDefs