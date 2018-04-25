const passport = require('passport');
const trickRouter = require('express').Router();
const Trick = require('../controllers/trick.controller');

trickRouter.route('/')
    .get(Trick.list)
    .post(Trick.addTrick);
trickRouter.route('/:id')
    .get(Trick.getTrick)
    .put(Trick.updateTrick)
    .delete(Trick.deleteTrick)

// userRouter.get('/', User.getUser);
// userRouter.post('/login', passport.authenticate('local'), User.login);
// userRouter.get('/logout', User.logout);
// userRouter.delete('/:_id', User.delete);

module.exports = trickRouter;

// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;