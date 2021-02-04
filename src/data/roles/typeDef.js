const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Roles {
    id: Int!
    name: String!
    users: [User!]!
}

extend type Query {
    roles: [Roles!]!
    role(id: Int!): Roles
}
`

module.exports = {
    typeDefs
}