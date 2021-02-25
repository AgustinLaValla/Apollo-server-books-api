const { registerInputValidator, loginInputValidator } = require('../../utils/credentialsValidator');
const { customErrorResponse } = require('../../utils/customErrorMessageResponse');
const { toTitleCase } = require('../../utils/toTitleCase');
const { internalServerErrorMessage } = require('../../utils/internalServerErrorMessage');
const User = require('../../models/User.model');
const { genSalt, hash, compare } = require('bcryptjs');
const { generateToken } = require('../../utils/token');

module.exports = {
    Mutation: {
        async register(_, { registerInput }) {
            const errors = registerInputValidator(registerInput);
            if (errors.length) return { error: errors };

            const { firstname, lastname, email, password } = registerInput;
            try {
                const userExists = await User.findOne({ email: email.toLowerCase() });
                if (userExists) return { error: customErrorResponse('User Already Exists') };

                const salt = await genSalt(10);
                const hashedPassword = await hash(password, salt);

                const user = await User.create({
                    firstname: toTitleCase(firstname),
                    lastname: toTitleCase(lastname),
                    email: email.toLowerCase(),
                    password: hashedPassword
                });

                const payload = {
                    _id: user._id,
                    firstname: toTitleCase(firstname),
                    lastname: toTitleCase(lastname),
                    email: email.toLowerCase(),
                }

                const token = generateToken(payload);

                return { user, token }
            } catch (error) {
                console.log(error);
                return { error: internalServerErrorMessage() }
            }
        },

        async login(_, { loginInput }) {
            const errors = loginInputValidator(loginInput);
            if (!errors) return { error: errors };

            const { email, password } = loginInput;
            try {
                const user = await User.findOne({ email: email.toLowerCase() })
                if (!user) return { error: customErrorResponse('User not found') };

                const isValid = await compare(password, user.password);
                if (!isValid) return { error: customErrorResponse('User or email is wrong') };

                const payload = {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: email.toLowerCase(),
                }

                const token = generateToken(payload);

                return { user, token }
            } catch (error) {
                console.log(error);
                return { error: internalServerErrorMessage() }
            }
        }
    }
}