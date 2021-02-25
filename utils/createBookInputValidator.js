function createBookInputValidator(createBookInput) {
    const { title, author } = createBookInput;
    let errors = [];

    if (!title) {
        errors.push({
            message: 'Bad Input: Title is required',
            status: 400
        })
    }

    if (!author) {
        errors.push({
            message: 'Bad Input: Author is requried',
            status: 400
        })
    }

    return errors;
}

module.exports = { createBookInputValidator }