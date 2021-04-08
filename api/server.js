const express = require('express');
//import users-router
const usersRouter = require('./users/users-router')
const {logger} = require('./middleware/middleware')

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
// global middlewares and the user's router need to be connected here
server.use(logger)

// Connect userRouter:
server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Clint's Heroku Server!</h2>`);
});

module.exports = server;
