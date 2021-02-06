const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const { getToken } = require('../../middleware/auth');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
require('dotenv').config();

const loginError = new AuthenticationError('Please log in!');

const resolvers = {
    Query: {
        profile: async (parent, args, context) => {
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
        user: async (parent, { id }) => {
            return await User.findByPk(id);
        },
    },

    Mutation: {
        //handle user registration
        register: async (parent, { email, password }) => {
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
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
        login: async (parent, { email, password }) => {
            const user = await User.findOne({
                where: { email: email },
                include: 'Role'
            });
            const valid = bcrypt.compare(password, user.password);

            if (!valid) {
                throw new AuthenticationError('Make sure your password is correct');
            } else {
                const token = getToken(user);
                return token
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
    }
}

module.exports = {
    resolvers
}