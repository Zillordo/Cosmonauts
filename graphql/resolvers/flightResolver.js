const Flight = require('../../models/flight');
const Cosmonaut = require('../../models/cosmonaut');

const cosmo = async cosmoIds => {
    try {
        const cosmos = await Cosmonaut.find({ _id: { $in: cosmoIds } });

        return cosmos.map(cosmo => {
            return { ...cosmo._doc, _id: cosmo.id };
        });
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    flights: async () => {
        try {
            const flights = await Flight.find();

            return flights.map(flight => {
                return { ...flight._doc, _id: flight.id, registeredCosmonauts: cosmo.bind(this, flight.registeredCosmonauts) }
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
            await Flight.deleteOne({ _id: args.flightId });
            return null;
        }
        catch (error) {
            throw error;
        }
    },

    updateFlight: async args => {
        try {
            await Flight.findByIdAndUpdate(args.id, {
                date: args.flightInput.date,
                capacity: args.flightInput.capacity
            });

            return null;
        } catch (error) {
            throw error;
        }
    }
}