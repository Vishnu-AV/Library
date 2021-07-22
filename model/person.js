let mongoose = require('mongoose');


// personal details schema

let personSchema = mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String,
        required: true
    }
});

let Person = mongoose.model('person', personSchema);
module.exports = Person;