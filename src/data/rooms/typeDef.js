const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Room {
    id: Int!
    room_name: String!
    room_capacity: Int!
    booking: [Booking]
}

extend type Query {
    rooms: [Room!]!
    room(id: Int!): Room
}

extend type Mutation {
    createRoom(room_name: String!, room_capacity: Int!): Room!
    updateRoom(id: Int!, room_name: String, room_capacity: Int): String!
    deleteRoom(id: Int!): String!
}
`

module.exports = {
    typeDefs
}