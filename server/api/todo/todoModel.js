var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

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

  owner: {type: ObjectId, ref: 'user'},

  project: {type: ObjectId, ref: 'project'},

  notes: [{type: ObjectId, ref: 'note'}]

});

module.exports = mongoose.model('todo', TodoSchema);
