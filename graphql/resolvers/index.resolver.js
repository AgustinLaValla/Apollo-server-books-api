const booksResolver = require('./book.resolver');
const authResolver = require('./auth.resolver');

module.exports = {
    Query: {
        ...booksResolver.Query
    },

    Mutation: {
        ...booksResolver.Mutation,
        ...authResolver.Mutation
    }
}