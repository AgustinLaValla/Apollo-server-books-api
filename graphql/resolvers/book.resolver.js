const { internalServerErrorMessage } = require("../../utils/internalServerErrorMessage");
const { customErrorResponse } = require('../../utils/customErrorMessageResponse');
const { createBookInputValidator } = require('../../utils/createBookInputValidator');
const { toTitleCase } = require('../../utils/toTitleCase');
const { updateBookInputValidator } = require("../../utils/updateBookInputValidator");
const { isAuth } = require('../../utils/token');
const Book = require('../../models/Book.model');

module.exports = {
    Query: {
        books: async () => {
            try {
                const books = await Book.find();
                return { books };
            } catch (error) {
                return { error: internalServerErrorMessage() }
            }
        },

        book: async (_, { id }) => {
            try {
                const book = await Book.findOne(id);
                return { book }
            } catch (error) {
                return { error: internalServerErrorMessage() }
            }
        }
    },

    Mutation: {
        createBook: async (_, { createBookInput }, { req }) => {
            const { error: authErrors } = isAuth(req);
            if (authErrors?.length) return { error: authErrors };

            const errors = createBookInputValidator(createBookInput);
            if (errors.length) return { error: errors };

            const { title, author, isPublished } = createBookInput;

            try {
                const exists = await Book.findOne({ title: toTitleCase(title) });
                if (exists) return {
                    error: customErrorResponse('Title Already Exists', 400)
                }

                const book = await Book.create({ title: toTitleCase(title), author: toTitleCase(author), isPublished });

                return { book }
            } catch (error) {
                console.log(error);
                return { error: internalServerErrorMessage() }
            }
        },

        updateBook: async (_, { updateBookInput }) => {
            const { error: authErrors } = isAuth(req);
            if (authErrors?.length) return { error: authErrors };

            const errors = updateBookInputValidator(updateBookInput);
            if (errors.length) return { error: errors };

            const { id, isPublished } = updateBookInput;

            try {
                const book = await Book.findByIdAndUpdate(id, { isPublished }, { new: true });
                if (!book) return { error: customErrorResponse('Book Not Found') };

                return { book }
            } catch (error) {
                console.log(error);
                return { error: internalServerErrorMessage() }
            }
        },

        deleteBook: async (_, { id }) => {
            const { error: authErrors } = isAuth(req);
            if (authErrors?.length) return { error: authErrors };
            
            try {
                const book = await Book.findByIdAndRemove(id);
                return { book, message: 'Book Successfully Deleted' }
            } catch (error) {
                console.log(error);
                return { error: internalServerErrorMessage() }
            }
        }
    }
}