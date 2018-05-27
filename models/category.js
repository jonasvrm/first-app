var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation', required: true }
});

categorySchema.methods.validateOrg = function(id){
    if (this.organisation.id != id) {
        throw { message: "Invalid organistion" };
    }
};

module.exports = mongoose.model('Category', categorySchema);