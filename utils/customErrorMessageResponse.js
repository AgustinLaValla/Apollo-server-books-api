function customErrorResponse(message, status = 400) {
    return [{ message, status }]
}

module.exports = { customErrorResponse };