const { User, Role, Booking, Room } = require('../db/models');
const bcrypt = require('bcrypt');
const { getToken, verifyToken, isAdmin } = require('../middleware/auth')
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const booking = require('../db/models/booking');
require('dotenv').config();

const loginError = new AuthenticationError('Please log in');
const forbidden = new ForbiddenError('You are not authorized!');

const resolvers = {
    Query: {
        profile: async (_, args, context) => {
            if (context.loggedIn) {
                return await User.findOne({
                    where: {
                        id: context.user.id
                    }
                })
            } else {
                throw loginError;
            }
        },
        users: async () => {
            return await User.findAll();
        },
        user: async (parent, { id }, context, info) => {
            return await User.findByPk(id);
        },
        roles: async () => {
            return await Role.findAll();
        },
        role: async (parent, { id }, context, info) => {
            return await Role.findByPk(id);
        },
        bookings: async () => {
            return await Booking.findAll();
        },
        booking: async (parent, { id }, context, info) => {
            return await Booking.findByPk(id);
        },
        rooms: async () => {
            return await Room.findAll();
        },
        room: async (parent, { id }) => {
            return await Room.findByPk(id);
        }
    },

    Mutation: {
        //handle user registration
        register: async (_, { email, password }) => {
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (user) {
                throw new AuthenticationError('This email has been used!');
            } else {
                return User.create({
                    RoleId: 2,
                    email,
                    password: bcrypt.hashSync(password, 10),
                    photo: null,
                    cloudinary_id: null
                });
            }
        },
        //handle user login
        login: async (_, { email, password }) => {
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
            const valid = bcrypt.compare(password, user.password);

            if (!valid) {
                throw new AuthenticationError('Make sure your password is correct');
            } else {
                const token = getToken(user);
                return token
            }
        },

        //Room CRUD
        createRoom: async (parent, { room_name, room_capacity }) => {
            return await Room.create({
                room_name,
                room_capacity
            });
        },
        updateRoom: async (parent, { id, room_name, room_capacity }) => {
            await Room.update({ room_name, room_capacity }, { where: { id } });
            return 'Room update success'
        },
        deleteRoom: async (parent, { id }) => {
            await Room.destroy({
                where: { id }
            });
            return 'Room delete success'
        },

        //create booking
        createBooking: async (parent, { RoomId, total_person, note, booking_time }, context) => {
            if (context.loggedIn) {
                const bookingTime = new Date(booking_time);
                const room = await Room.findByPk(RoomId);

                if (total_person > room.room_capacity) {
                    return 'Total person is more than room capacity!';
                } else {
                    return await Booking.create({
                        UserId: context.user.id,
                        RoomId: RoomId,
                        total_person: total_person,
                        note: note,
                        booking_time: bookingTime,
                        check_in_time: null,
                        check_out_time: null
                    })
                }
            } else {
                throw loginError;
            }
        }
    },

    User: {
        roles: async (parent) => {
            return await parent.getRole();
        },
        booking: async (parent) => {
            return await parent.getBookings();
        }
    },
    Roles: {
        users: async (parent) => {
            return await parent.getUsers();
        },
    },
    Booking: {
        user: async (parent) => {
            return await parent.getUser();
        },
        room: async (parent) => {
            return await parent.getRoom();
        }
    },
    Room: {
        booking: async (parent) => {
            return await parent.getBookings();
        }
    }
}

module.exports = resolvers;