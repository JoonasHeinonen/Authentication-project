var express = require('express');
var router  = express.Router();
var User    = require('../models/user.js');

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err);
    }
}

router.get('/', function(req, res, next) {

});

router.get('/logout', function(req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) { 
                return next(err); 
            } else {
                return res.redirect('/')
            }
        });
    }
});

router.post('/', function(req, res, next) {
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {
        
        let userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }

        User.create(userData, function(err, user) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/profile');
            }
        });
    }
});

module.exports = router;