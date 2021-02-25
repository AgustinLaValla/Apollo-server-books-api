const { connect } = require('mongoose');
const { config } = require('dotenv');
const { yellow } = require('colors');

config();

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
    await connect(MONGO_URI, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });
    console.log(yellow(`DATABASE IS CONNECTED`))
}

module.exports = { connectDB };