const { text } = require('express');
const mongoose = require('mongoose');
// require('mongoose-long')(mongoose);
const {Types: {Long}} = mongoose;


const BookSchema = new mongoose.Schema({
    rate: {
        type: Number,
        default: 0
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: ''
    }  
})

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;