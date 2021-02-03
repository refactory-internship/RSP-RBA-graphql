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
        booking: [Booking]
    }

    type Booking {
        id: Int!
        user: User
        room: Room
        total_person: Int!
        booking_time: String!
        note: String!
        check_in_time: String!
        check_out_time: String!
    }

    type Room {
        id: Int!
        room_name: String!
        room_capacity: Int!
        booking: [Booking]
    }

    type Query {
        profile: User
        users: [User!]!
        user(id: Int!): User
        roles: [Roles!]!
        role(id: Int!): Roles
        bookings: [Booking!]!
        booking(id: Int!): Booking
        rooms: [Room!]!
        room(id: Int!): Room
    }

    type Mutation {
        register (email: String!, password: String!): User!
        login(email: String!, password: String!): String!
    }
`

module.exports = typeDefs