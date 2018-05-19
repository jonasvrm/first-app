var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Category', categorySchema);