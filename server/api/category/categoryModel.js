var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

CategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('category', CategorySchema);
