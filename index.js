const {ApolloServer} = require('apollo-server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const db = require('./db')
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {db}
})

server.listen().then(({url}) => {
    console.log(`Server is ready at ${url}`)
})