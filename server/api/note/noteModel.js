var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  body: {
    type: String,
    required: true,
  },

  title: {
    type: String,
  },

  owner: {type: Schema.Types.ObjectId, ref: 'user'},

  categories: [{type: Schema.Types.ObjectId, ref: 'category'}]
});

NoteSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('note', NoteSchema);
