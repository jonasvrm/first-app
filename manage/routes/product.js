var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var Product = require(__base + 'models/product');
var Category = require(__base + 'models/category');

var csrfProtect = csrf();
router.use(csrfProtect);

/* GET main page */
router.get('/index', function (req, res, next) {
    res.render('product/index', { title: 'Products', csrfToken: req.csrfToken() });
});

/* GET all products */
router.get('/all', async (req, res, next) => {
    try {
        var products = await Product.find({ organisation: req.user.organisation }).populate("categories").populate("organisation").exec();
        let productArray = [];

        products.forEach(function (product) {
            productArray.push(product);
        });

        res.render('product/all', { layout: false, products: productArray });
    } catch (err) {
        res.render('error', { message: err });
    }
});

/* GET all products */
router.get('/edit/:id', async (req, res, next) => {

    try {
        var product = await Product.findById(req.params.id);
        //pass available categories to view   
        var categories = await Category.find({ user: req.user.id });
        var categoryArray = [];

        categories.forEach(function (cat) {
            categoryArray.push(cat);
        });

        res.render('product/edit', { product: product, categories: categoryArray, csrfToken: req.csrfToken() });
    } catch (e) {
        res.render('error', { message: err });
    }
});

/* UPDATE the product */
router.post('/edit/:id', async (req, res, next) => {

    try {
        //validation
        req.checkBody('name', 'Invalid Name').notEmpty();
        req.checkBody('price', 'Invalid Price').notEmpty().isNumber();
        var errors = req.validationErrors();

        if (errors) {
            var messages = [];
            errors.forEach(function (error) {
                messages.push(error.msg);
            });
            res.redirect(__manage + '/product/edit/'+req.params.id, req.flash('error', messages));
        }

        //load old product
        var product = await Product.findById(req.params.id);

        //apply new values
        product.name = req.body.name;
        product.price = req.body.price;

        product.categories.push(req.body.categoryId);

        // Using a promise rather than a callback
        await product.save();

        res.redirect( __manage + '/product/all');

    } catch (err) {
        res.render('error', { message: err });
    }
});

/* get INSERT form */
router.get('/add', function (req, res, next) {

    //pass available categories to view   
    Category.find({}, function (err, categories) {    
        var categoryArray = [];

        categories.forEach(function (cat) {
            categoryArray.push(cat);
        });

        res.render('product/add', { categories: categoryArray, csrfToken: req.csrfToken() });
    });   
});

/* INSERT new product */
router.post('/add', function (req, res, next) {
    var product = new Product({
        name: req.body.name,
        price: req.body.price,
        user: req.user.id,
        organisation: req.user.organisation
    });

    product.categories.push(req.body.categoryId);

    product.save(function (err, result) {
        if (err) {
            res.json({ message: err });
        } else {
            res.redirect( __manage + '/product/index');
        }
    });
});

/* DELETE one product */
router.post('/delete/:id', function (req, res, next) {
    var message;

    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            message = err;
        else
            message = "Success";
    });

    res.json({ message: message });
    
});

module.exports = router;