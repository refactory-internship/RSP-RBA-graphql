const { Room } = require('../../db/models');
const { ForbiddenError } = require('apollo-server-express');

const forbidden = new ForbiddenError('You are not authorized!');

const resolvers = {
    Query: {
        rooms: async () => {
            return await Room.findAll();
        },
        room: async (parent, { id }) => {
            return await Room.findByPk(id);
        }
    },

    Mutation: {
        //Room CRUD
        createRoom: async (parent, { room_name, room_capacity }, context) => {
            if (context.loggedIn && context.user.role === 'Admin') {
                return await Room.create({
                    room_name,
                    room_capacity
                });
            } else {
                throw forbidden
            }
        },
        updateRoom: async (parent, { id, room_name, room_capacity }, context) => {
            if (context.loggedIn && context.user.role === 'Admin') {
                await Room.update({ room_name, room_capacity }, { where: { id } });
                return 'Room update success'
            } else {
                throw forbidden
            }
        },
        deleteRoom: async (parent, { id }, context) => {
            if (context.loggedIn && context.user.role === 'Admin') {
                await Room.destroy({
                    where: { id }
                });
                return 'Room delete success'
            } else {
                throw forbidden
            }
        }
    },

    Room: {
        booking: async (parent) => {
            return await parent.getBookings();
        }
    }
}

module.exports = {
    resolvers
}