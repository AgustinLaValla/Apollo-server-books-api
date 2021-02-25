const { sign, verify } = require('jsonwebtoken');
const { config } = require('dotenv');
const { customErrorResponse } = require('./customErrorMessageResponse');

config();

const SECRET = process.env.SECRET;

function generateToken(payload) {
    return sign(payload, SECRET, { expiresIn: '4h' });
}

function isAuth(req) {
    console.log(req.headers);
    const bearerToken = req.headers.authorization;
    if (!bearerToken) return { error: customErrorResponse('No Token Provided') };

    const token = bearerToken.split(' ')[1];
    if (!token) return { error: customErrorResponse('Token must be bearer format') };

    const decoded = verify(token, SECRET);

    if (decoded.exp * 1000 < Date.now()) {
        return { error: customErrorResponse('Expired Token') }
    }

    return decoded;
}

module.exports = { generateToken, isAuth };