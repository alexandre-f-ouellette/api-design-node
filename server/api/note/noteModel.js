var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var NoteSchema = new Schema({
  body: {
    type: String,
    required: true,
  },

  title: {
    type: String,
  },

  owner: {type: Schema.Types.ObjectId, ref: 'user'},

  parent: {
    kind: String,
    item: { type: ObjectId, refPath: 'parent.kind' }
  }
});

module.exports = mongoose.model('note', NoteSchema);
