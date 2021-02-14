const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config.js')

const pubsub = new PubSub()

const PORT = process.env.PORT || 500

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
})

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('MongoDB Connected.')
    return server.listen({ port: PORT })
  })
  .then((res) => {
    console.log(`server running at ${res.url}`)
  })
  .catch((err) => {
    console.log(err)
  })
