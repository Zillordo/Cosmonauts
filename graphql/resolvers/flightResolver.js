const Flight = require('../../models/flight');

module.exports = {
    flights: async () => {
        try {
            const flights = await Flight.find();

            return flights.map(flight => {
                return { ...flight._doc, _id: flight.id }
            });
        }
        catch (error) {
            throw error;
        }
    },

    createFlight: async args => {
        try {
            const flight = new Flight({
                date: args.flightInput.date,
                capacity: args.flightInput.capacity
            });

            const res = await flight.save();

            return { ...res._doc, _id: res.id }
        }
        catch (error) {
            throw error;
        }
    },

    deleteFlight: async args => {
        try {
            await flight.deleteOne({ _id: args.flightId });
            return null;
        }
        catch (error) {
            throw error;
        }
    }
}