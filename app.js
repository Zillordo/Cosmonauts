const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');

const grpahQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');


const app = express();

app.use(bodyParser.json());


//nastavení headrů pro access control
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// "připojení" graphQL k aplikačnímu serveru
app.use(
    '/graphql',
    graphqlHttp({
        schema: grpahQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    })
);


//připojení k mongoDB cluster pomocí mongoose
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD
    }@cluster0-71pmp.azure.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
).then(() => {
    app.listen(8000);
}).catch(err => {
    console.log(err);
});