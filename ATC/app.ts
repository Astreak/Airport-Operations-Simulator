import express from 'express';
import { simpleSchema } from './src/schema/simpleSchema';
import { graphqlHTTP } from "express-graphql";
import { ok } from './src/controllers/simpleResolver';
var app = express();
const port = 1000;
app.use('/graphql',
    graphqlHTTP({
    schema: simpleSchema,
    rootValue: ok
}));
app.listen(port,() => {
    console.log("Server running");
})