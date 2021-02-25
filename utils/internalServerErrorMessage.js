function internalServerErrorMessage() {
    return [{ message: 'Internal Server Error', status: 500 }]
}

module.exports = { internalServerErrorMessage };