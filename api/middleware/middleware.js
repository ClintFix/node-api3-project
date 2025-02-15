const Users = require('../users/users-model')

function logger(req, res, next) {
  console.log(req.method, req.url, new Date())
  next();
}

function validateUserId(req, res, next) {
  const {id} = req.params;
  Users.getById(id)
    .then(user => {
      if(!user) {
        res.status(404).json({ message: "user not found" })
      }
      else {
        req.user = user //to access user with id without needing another query
        next();
      }
    })
    .catch(err => {
      res.status(500).json(err.message)
    })
  
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({message: "missing required name field"})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body.text) {
    res.status(400).json({message: "missing required text field"})
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}