const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
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

/**
 * Můj plán je vytvořit model cosmonaut a model letu který bude mít zapamatovaný array cosmonautů kteří jsou 
 * zaregistrovaní na ten let.
 * 
 * Pokud to má být tak, že jeden cosmonaut může být přihlášen na více letech zaráz.
 * 
 * Pokud by to bylo tak, že cosmonaut může být přihlášení pouze na jeden let v určitém čase. Tak by bylo 
 * jednodušší mít na jednotlivém cosmonautu mít zapamatované na jaký let je přihlášení (npař. podle Id letu). 
 * Aby se snáze korigovalo zda je na jednom už přihlášený nebo není. 
 */