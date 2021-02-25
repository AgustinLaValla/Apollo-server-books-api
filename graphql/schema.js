const { gql } = require('apollo-server');

module.exports = gql`
    # ---------------------- BOOKS ----------------------
    type Book {
        _id: ID!
        title: String!
        author: String!
        isPublished: Boolean
    }
    
    type ErrorResponse {
        message: String
        status: String
    }

    type BooksResponse {
        books: [Book]
        error: [ErrorResponse]
    }

    type BookResponse {
        book: Book
        error: [ErrorResponse]
        message: String
    }

    input CreateBookInput {
        title: String!
        author: String!
        isPublished: Boolean
    }

    input UpdateBookInput {
        id: ID!
        isPublished: Boolean!
    }

    # ---------------------- AUTH ----------------------
    type User {
        _id: ID!
        firstname: String!
        lastname: String!
        email: String!
    }

    input RegisterInput {
        firstname: String!
        lastname: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type UserResponse {
        user: User
        error: [ErrorResponse]
        token: String
    }

    # ---------------- QUERYS & MUTATIONS --------------

    type Query {
        books: BooksResponse!
        book(id: Int!): BookResponse
    }

    type Mutation {
        createBook(createBookInput: CreateBookInput!): BookResponse!
        updateBook(updateBookInput: UpdateBookInput): BookResponse!
        deleteBook(id: ID!): BookResponse!

        register(registerInput: RegisterInput): UserResponse!
        login(loginInput: LoginInput): UserResponse!
    }
`;