const jwt = require('jsonwebtoken');
const { User } = require('../db/models')
require('dotenv').config();

const getToken = (user) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return token;
}

const verifyToken = (token) => {
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return {
            user,
            loggedIn: true
        }
    } catch (error) {
        return {
            loggedIn: false
        }
    }
}

module.exports = {
    getToken,
    verifyToken,
}