const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    registeredCosmonauts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cosmonaut'
        }
    ]
});

module.exports = mongoose.model('Flight', flightSchema);
