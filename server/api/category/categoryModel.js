var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  owner: {type: ObjectId, ref: 'user'},

  children: [{
    kind: String,
    item: { type: ObjectId, refPath: 'children.kind' },
    _id: false
  }]
});

module.exports = mongoose.model('category', CategorySchema);
