var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var Category = require('../models/category');

var csrfProtect = csrf();
router.use(csrfProtect);

/* GET main page */
router.get('/index', function (req, res, next) {
    res.render('category/index', { title: 'Categories', csrfToken: req.csrfToken() });
});

/* GET all categories */
router.get('/all', function (req, res, next) {

    Category.find({ user: req.user.id }, function (err, categories) {
        var categoryArray = [];

        categories.forEach(function (category) {
            categoryArray.push(category);
        });

        res.render('category/all', { layout: false, categories: categoryArray });
    });
});

/* get UPDATE form */
router.get('/edit/:id', function (req, res, next) {
    Category.findById(req.params.id, function (err, category) {
        res.render('category/edit', { category: category, csrfToken: req.csrfToken() });
    });
});

/* UPDATE the category */
router.post('/edit/:id', function (req, res, next) {
    var org = {
        name: req.body.name
    };

    Category.findByIdAndUpdate(req.params.id, org, function (err, result) {
        if (err) {

        } else {
            res.redirect('/category/index');
        }
    });
});

/* get INSERT form */
router.get('/add', function (req, res, next) {
    res.render('category/add', { csrfToken: req.csrfToken() });
});

/* INSERT new category */
router.post('/add', function (req, res, next) {
    var org = new Category({
        name: req.body.name,
        user: req.user.id
    });

    org.save(function (err, result) {
        if (err) {

        } else {
            res.redirect('/category/index');
        }
    });
});

/* DELETE one categories */
router.post('/delete/:id', function (req, res, next) {
    var message;

    Category.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            message = err;
        else
            message = "Success";
    });

    res.json({ message: message });

});

module.exports = router;