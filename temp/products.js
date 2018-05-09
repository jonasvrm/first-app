var Product = require('../models/product');
var Organisation = require('../models/organisation');
var Category = require('../models/category');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dbcontext');

var products = [
    new Product({
        name: 'Spinaci',
        organisation: {name: 'Jonas test restaurant'},
        category: [{ name: 'Pizza' }],
        price: 10
    }),
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    var element = products[i];
    console.log('saving initialized');
    element.save(function (err, result) {
        if (err) {
            console.log(err);            
        } else{
            console.log('Added: ' + result.name);
        }
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
