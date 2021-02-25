function registerInputValidator(registerInput) {
    const { firstname, lastname, email, password } = registerInput;
    let errors = [];

    if (!firstname) {
        errors.push({ message: 'Firstname is requried', status: 400 });
    }

    if (!lastname) {
        errors.push({ message: 'lastname is requried', status: 400 });
    }

    if (!email) {
        errors.push({ message: 'email is requried', status: 400 });
    }

    if (!password) {
        errors.push({ message: 'password is requried', status: 400 });
    }

    return errors;
}

function loginInputValidator(loginInput) {
    const { email, password } = loginInput;
    let errors = [];

    if (!email) {
        errors.push({ message: 'email is requried', status: 400 });
    }

    if (!password) {
        errors.push({ message: 'password is requried', status: 400 });
    }

    return errors;
}

module.exports = { registerInputValidator, loginInputValidator };