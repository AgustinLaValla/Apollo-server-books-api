function updateBookInputValidator(updateBookInput) {
    const { id, isPublished } = updateBookInput
    let errors = [];

    if(!id) {
        errors.push({
            message: 'Bad Input: id is required',
            status: 400
        })
    }

    if(!isPublished) {
        errors.push({
            message: 'Bad Input: id is required',
            status: 400
        })
    }

    return errors;
}

module.exports = { updateBookInputValidator }