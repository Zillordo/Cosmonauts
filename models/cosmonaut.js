const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cosmonautSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surName: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Cosmonaut', cosmonautSchema);