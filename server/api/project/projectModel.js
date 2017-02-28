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

  owner: {type: Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('project', ProjectSchema);
