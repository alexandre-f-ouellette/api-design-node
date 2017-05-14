var Note = require('./noteModel');
var _ = require('lodash');
var logger = require('../../util/logger');

exports.params = function(req, res, next, id) {
  Note.findById(id)
    .exec()
    .then(function(note) {
      if (!note) {
        next(new Error('No note with that id'));
      } else {
        req.note = note;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Note.find({})
    .exec()
    .then(function(notes){
      res.json(notes);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var note = req.note;
  res.json(note);
};

exports.put = function(req, res, next) {
  var note = req.note;

  var update = req.body;

  _.merge(note, update);

  note.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newNote = req.body;
  newNote.owner = req.user._id;
  Note.create(newNote)
    .then(function(note) {
      res.json(note);
    }, function(err) {
      logger.error(err);
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.note.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
