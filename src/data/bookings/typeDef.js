const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Booking {
    id: Int!
    user: User
    room: Room
    total_person: Int!
    booking_time: String!
    note: String!
    check_in_time: String
    check_out_time: String
}

extend type Query {
    bookings: [Booking!]!
    booking(id: Int!): Booking
}

extend type Mutation {
    createBooking(RoomId: Int!, total_person: Int!, note: String!, booking_time: String!): Booking
    checkInBooking(id: Int!): String!
}
`
module.exports = {
    typeDefs
}