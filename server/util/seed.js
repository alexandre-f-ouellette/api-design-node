var User = require('../api/user/userModel');
var Project = require('../api/project/projectModel');
var Category = require('../api/category/categoryModel');
var Note = require('../api/note/noteModel');
var Todo = require('../api/todo/todoModel');
var _ = require('lodash');
var logger = require('./logger');

logger.log('Seeding the Database');

var users = [
  {username: 'Jimmylo', password: 'test'},
  {username: 'Xoko', password: 'test'},
  {username: 'katamon', password: 'test'}
];

var categories = [
  {name: 'intros'},
  {name: 'angular'},
  {name: 'UI/UX'}
];

var notes = [
  {body: 'This is a sample note'},
  {body: 'This is a note with quite the long body, it will contain quite a bit of text. How are you? I am pretty good actually. That is great!!'},
  {body: 'Note with a title', title: 'Note title ... very original'}
];

var projects = [
  {name: 'Test Project 1', shortName: 'proj1', startDate: new Date(), endDate: new Date(50, 5, 25)},
  {name: 'Test Project 2', shortName: 'proj2', startDate: new Date()},
  {name: 'Test Project 3', shortName: 'proj3'}
];

var todos = [
  {body: 'Test Todo 1', dueDate: new Date()},
  {body: 'Test Todo 2'},
  {body: 'Test Todo 3'}
];

var createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

var cleanDB = function() {
  logger.log('... cleaning the DB');
  var cleanPromises = [User, Category, Project, Note, Todo]
    .map(function(model) {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
}

var createUsers = function(data) {

  var promises = users.map(function(user) {
    return createDoc(User, user);
  });

  return Promise.all(promises)
    .then(function(users) {
      return _.merge({users: users}, data || {});
    });
};

var createNotes = function(data) {
  var promises = notes.map(function(note) {
    return createDoc(Note, note);
  });

  return Promise.all(promises)
    .then(function(notes) {
      return _.merge({notes: notes}, data || {});
    });
};


var createTodos = function(data) {
  var promises = todos.map(function(todo) {
    return createDoc(Todo, todo);
  });

  return Promise.all(promises)
    .then(function(todos) {
      return _.merge({todos: todos}, data || {});
    });
};

var createCategories = function(data) {
  var newCategories = categories.map(function(category, i) {
    var childrenData = [
      { kind: 'note', item: data.notes[i]._id },
      { kind: 'todo', item: data.todos[i]._id }
    ];

    category.owner = data.users[i]._id;
    category.children = childrenData;

    return createDoc(Category, category);
  });

  return Promise.all(newCategories)
    .then(function(categories) {
      return _.merge({categories: categories}, data || {});
    });
};

var createProjects = function(data) {
  var newProjects = projects.map(function(project, i) {
    var childrenData = [
      { kind: 'note', item: data.notes[i]._id },
      { kind: 'todo', item: data.todos[i]._id },
      { kind: 'category', item: data.categories[i]._id }
    ];

    project.owner = data.users[i]._id;
    project.children = childrenData;

    return createDoc(Project, project);
  });

  return Promise.all(newProjects)
    .then(function() {
      return 'Seeded DB with 3 Projects, 3 Users, 3 Categories, 3 Todos and 3 Notes';
    });
};

cleanDB()
  .then(createUsers)
  .then(createNotes)
  .then(createTodos)
  .then(createCategories)
  .then(createProjects)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
