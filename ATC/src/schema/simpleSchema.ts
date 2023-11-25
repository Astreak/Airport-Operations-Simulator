import { buildSchema } from "graphql";
let simpleSchema = buildSchema(`
    type CustomQuery{
        name: String
        age: Int
        email: String
    }
    type RootQ{
        method: CustomQuery
    }
    schema{
        query: RootQ
    }
`);
export { simpleSchema };