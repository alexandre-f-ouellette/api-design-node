var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  body: {
    type: String,
    required: true,
  },

  title: {
    type: String,
  },

  owner: {type: Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('note', NoteSchema);
