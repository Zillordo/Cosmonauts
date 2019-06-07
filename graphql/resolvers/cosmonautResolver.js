const Cosmonaut = require('../../models/cosmonaut');
const Flight = require('../../models/flight');


module.exports = {

    cosmonauts: async () => {
        try {
            const cosmonauts = await Cosmonaut.find();

            return cosmonauts.map(cosmonaut => {
                return { ...cosmonaut._doc, _id: cosmonaut.id };
            });
        }
        catch (error) {
            throw error;
        }
    },

    registerCosmonaut: async args => {
        try {

            const cosmo = new Cosmonaut({
                name: args.cosmonautInput.name,
                surName: args.cosmonautInput.surName,
                age: args.cosmonautInput.age,
                experience: args.cosmonautInput.experience
            });


            const res = await cosmo.save();

            await Flight.findById(args.cosmonautInput.flightId, (err, doc) => {
                doc.registeredCosmonauts.push(cosmo);
                doc.save();
            });

            return { ...res._doc, _id: res.id };
        }
        catch (err) {
            throw err;
        }
    },

    deleteCosmonaut: async args => {
        try {
            await Cosmonaut.deleteOne({ _id: args.cosmonautId });
            return null;
        }
        catch (error) {
            throw error;
        }
    }
}