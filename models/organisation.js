var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category = require('./category');

var orgSchema = new Schema({
    name: { type: String, required: true },
    categories: [Category.schema],
});

module.exports = mongoose.model('Organisation', orgSchema);