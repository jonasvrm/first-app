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
router.get('/edit/:id', async (req, res, next) => {
    try {
        var category = await Category.findById(req.params.id);
        res.render('category/edit', { category: category, csrfToken: req.csrfToken() });    
    } catch (err) {
        res.render('error', { message: err });
    }   
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
router.post('/add', async (req, res, next) => {
    try {
        var cat = new Category({
            name: req.body.name,
            user: req.user.id,
            organisation: req.user.organisation
        });
        await cat.save();
        res.redirect('/category/index');
    } catch (err) {
        res.render('error', { message: err });
    }   
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