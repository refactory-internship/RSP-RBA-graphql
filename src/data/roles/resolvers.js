const { Role } = require('../../db/models');

const resolvers = {
    Query: {
        roles: async () => {
            return await Role.findAll();
        },
        role: async (parent, { id }) => {
            return await Role.findByPk(id);
        }
    },

    Roles: {
        users: async (parent) => {
            return await parent.getUsers();
        },
    }
}

module.exports = {
    resolvers
}