var express = require('express');
var bcrypt  = require('bcrypt);');
var User    = require('../models/user.js');

router.get('/', function(req, res, next) {

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