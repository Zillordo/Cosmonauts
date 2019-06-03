const cosmonautResolver = require('./cosmonautResolver');
const flightResolver = require('./flightResolver');

const rootResolver = {
    ...cosmonautResolver,
    ...flightResolver
}

module.exports = rootResolver;