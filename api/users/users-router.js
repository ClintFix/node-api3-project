const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
// The middleware functions also need to be required
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware')

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json("There was error retrieving Users")
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then(newUser => {
      res.status(200).json(newUser)
    })
    .catch(err => {
      res.status(500).json(err.message)
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const {id} = req.params;
  Users.update(id, req.body)
    .then(() => {
      Users.getById(id)
       .then(updatedUser => {
         res.status(200).json(updatedUser)
       })
      .catch(err => {
        res.status(500).json(err.message)
      })
    })
    .catch(err => {
      res.status(500).json(err.message)
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const {id} = req.params;
  Users.remove(id)
    .then(() => {
      res.status(200).json(req.user)
    })
    .catch(err => {
      res.status(500).json(err.message)
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const {id} = req.params;
  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json(err.message)
    })

});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = {...req.body, user_id: req.params.id };

  Posts.insert(postInfo)
    .then(newPost => {
      console.log(newPost)
      res.status(200).json(newPost)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err.message)
    })
});

// do not forget to export the router
module.exports = router;
