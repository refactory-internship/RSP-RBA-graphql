const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    id: Int!
    email: String!
    photo: String
    roles: Roles!
    booking: [Booking]
}

extend type Query {
    profile: User
    users: [User!]!
    user(id: Int!): User
}

type Mutation {
    register (email: String!, password: String!): User!
    login(email: String!, password: String!): String! 
}
`

module.exports = {
    typeDefs
}