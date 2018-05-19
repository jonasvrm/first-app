var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user');

var csrfProtect = csrf();
router.use(csrfProtect);

/* GET users listing. */
router.get('/signup', function (req, res, next) {
    res.render('user/signup', { title: 'Sign Up', errors: req.flash('error'), csrfToken: req.csrfToken() });
});

/* GET users listing. */
router.post('/signup', passport.authenticate(
    'local.signup',
    {
	    successRedirect: '/user/profile',
	    failureRedirect: '/user/signup',
        failureFlash: true
    }
));

/* GET sign in page. */
router.get('/signin', function (req, res, next) {
    res.render('user/signin', { title: 'Sign In', errors: req.flash('error'), csrfToken: req.csrfToken() });
});

/* POST Attempt sign in */
router.post('/signin', passport.authenticate(
    'local.signin',
    {
        successRedirect: '/user/profile',
        failureRedirect: '/user/signin',
        failureFlash: true
    }
));

/* GET logout. */
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('signin');
});

/* GET profile page. */
router.get('/profile', function (req, res, next) {
    res.render('user/profile', { title: 'Profile', errors: req.flash('error'), csrfToken: req.csrfToken() });
});

/* GET all users */
router.get('/all', function (req, res, next) {
	User.find({}, function(err, users) {
        var userArray = [];
    
        users.forEach(function(user) {
            userArray.push(user);
        });
    
        res.render('user/all', { title: 'All users', users: userArray, csrfToken: req.csrfToken() });  
    });
});

module.exports = router;



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("signin");
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {       
        res.redirect("signin");
    }
    return next();
    
}