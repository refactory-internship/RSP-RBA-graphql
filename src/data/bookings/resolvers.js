const { Booking, Room } = require('../../db/models');
const { AuthenticationError } = require('apollo-server-express');
const { sendMail } = require('../../config/transporter');

const loginError = new AuthenticationError('Please log in');

const resolvers = {
    Query: {
        bookings: async () => {
            return await Booking.findAll();
        },
        booking: async (parent, { id }) => {
            return await Booking.findByPk(id);
        }
    },

    Mutation: {
        //create booking
        createBooking: async (parent, { RoomId, total_person, note, booking_time }, context) => {
            if (context.loggedIn) {
                const bookingTime = new Date(booking_time);
                const check_in_time = bookingTime.setHours(16, 30);
                const check_out_time = bookingTime.setHours(23, 30);
                const room = await Room.findByPk(RoomId);

                if (total_person > room.room_capacity) {
                    throw new Error('Total person is more than room capacity!')
                } else {
                    sendMail(context.user.email, 'Room Booking Details', 'Hello! This is your booking details on our room!');
                    return await Booking.create({
                        UserId: context.user.id,
                        RoomId: RoomId,
                        total_person: total_person,
                        note: note,
                        booking_time: bookingTime,
                        check_in_time: check_in_time,
                        check_out_time: check_out_time
                    });
                }
            } else {
                throw loginError;
            }
        },
        //check in
        checkInBooking: async (parent, { id }, context) => {
            if (context.loggedIn) {
                const check_in_time = new Date();

                await Booking.update({
                    check_in_time: check_in_time
                }, { where: { id } });

                sendMail(context.user.email, 'Check-In Details', 'Hello! This is an email regarding your check in!');
                return ('An email has been sent to your account!');
            } else {
                throw loginError
            }
        }
    },

    Booking: {
        user: async (parent) => {
            return await parent.getUser();
        },
        room: async (parent) => {
            return await parent.getRoom();
        }
    }
}

module.exports = {
    resolvers
}