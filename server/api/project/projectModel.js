var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
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

  categories: [{type: Schema.Types.ObjectId, ref: 'category'}]
});

ProjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('project', ProjectSchema);
