const Cosmonaut = require('../../models/cosmonaut');

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

    createCosmonaut: async args => {
        try {
            const cosmo = new Cosmonaut({
                name: args.cosmonatuInput.name,
                surName: args.cosmonatuInput.surName,
                age: args.cosmonatuInput.age,
                experience: args.cosmonatuInput.experience
            });

            const res = await cosmo.save();

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