var mongoose = require('mongoose');
var Organisation = require('./organisation');
var Category = require('./category');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: { type: String, required: true },
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation' },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', productSchema);