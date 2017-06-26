var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  shortName: {
    type: String,
    required: true,
    unique: true
  },

  startDate: {
    type: Date
  },

  endDate: {
    type: Date
  },

  owner: {type: Schema.Types.ObjectId, ref: 'user'},

  notes: [{type: Schema.Types.ObjectId, ref: 'note'}],

  todos: [{type: Schema.Types.ObjectId, ref: 'todo'}],

  categories: [{type: Schema.Types.ObjectId, ref: 'category'}]
});

ProjectSchema.plugin(require('mongoose-paginate'));

module.exports = mongoose.model('project', ProjectSchema);
