const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isPublished: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = model('Book', bookSchema);