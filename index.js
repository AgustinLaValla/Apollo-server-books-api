const { ApolloServer } = require('apollo-server');
const { magenta } = require('colors');
const { connectDB } = require('./db');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers/index.resolver');

const port = process.env.PORT || 4000;

async function main() {
    await connectDB();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req })
    });
    await server.listen(port);
    console.log(magenta(`Server or port: ${port}`));
}

main();

