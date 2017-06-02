var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  body: {
    type: String,
    required: true
  },

  dueDate: {
    type: Date
  },

  completed: {
    type: Boolean,
    default: false
  },

  owner: {type: Schema.Types.ObjectId, ref: 'user'},

  notes: [{type: Schema.Types.ObjectId, ref: 'note'}]

});

module.exports = mongoose.model('todo', TodoSchema);
