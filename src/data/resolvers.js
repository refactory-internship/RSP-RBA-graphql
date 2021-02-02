const { User, Role } = require('../db/models');
const bcrypt = require('bcrypt');
const { getToken, verifyToken, isAdmin } = require('../middleware/auth')
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
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
        getUsers: async (_, { id }) => {
            return await User.findByPk(id);
        },
        getRole: async (_, { id }) => {
            return await Role.findByPk(id);
        },
        getAllRoles: async (_) => {
            return await Role.findAll();
        },
        getAllUsers: async (_, args, context) => {
            if (context.user) {
                const user = await User.findOne({
                    where: { id: context.user.id },
                    include: 'Role'
                });

                if (user.Role.name === 'Admin') {
                    return User.findAll();
                } else {
                    throw forbidden;
                }
            } else {
                throw loginError;
            }
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
        }
    },

    User: {
        async roles(roles) {
            return roles.getRole();
        }
    },
    Roles: {
        async users(users) {
            return users.getUsers();
        }
    }
}

module.exports = resolvers;