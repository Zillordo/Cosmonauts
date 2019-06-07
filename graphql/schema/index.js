const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Cosmonaut {
    _id: ID!
    name: String!
    surName: String!
    age: Int!
    experience: String!
}
type Flight {
    _id: ID!
    date: String!
    capacity: Int!
    registeredCosmonauts: [Cosmonaut!]
}


input CosmonautInput {
    name: String!
    surName: String!
    age: Int!
    experience: String!
    flightId: ID!
}
input FlightInput {
    date: String!
    capacity: Int!
}


type RootQuery {
    cosmonauts: [Cosmonaut!]!
    flights: [Flight!]!
}
type RootMutation {
    registerCosmonaut(cosmonautInput: CosmonautInput): Cosmonaut
    createFlight(flightInput: FlightInput): Flight
    deleteCosmonaut(cosmonautId: ID!): Cosmonaut
    deleteFlight(flightId: ID!): Flight
}


schema {
    query: RootQuery
    mutation: RootMutation
}
`);