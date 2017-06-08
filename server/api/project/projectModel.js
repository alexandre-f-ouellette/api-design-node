var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

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

  owner: {type: ObjectId, ref: 'user'},

  children: [{
    kind: String,
    item: { type: ObjectId, refPath: 'children.kind' }
  }]
});

ProjectSchema.plugin(require('mongoose-paginate'));

module.exports = mongoose.model('project', ProjectSchema);
