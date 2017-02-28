var User = require('../api/user/userModel');
var Project = require('../api/project/projectModel');
var Category = require('../api/category/categoryModel');
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

var projects = [
  {name: 'Test Project 1', shortName: 'proj1', startDate: new Date(), endDate: new Date(50, 5, 25)},
  {name: 'Test Project 2', shortName: 'proj2', startDate: new Date()},
  {name: 'Test Project 3', shortName: 'proj3'}
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
  var cleanPromises = [User, Category, Project]
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

var createCategories = function(data) {
  var promises = categories.map(function(category) {
    return createDoc(Category, category);
  });

  return Promise.all(promises)
    .then(function(categories) {
      return _.merge({categories: categories}, data || {});
    });
};

var createProjects = function(data) {

  var newProjects = projects.map(function(project, i) {
    project.owner = data.users[i]._id;
    return createDoc(Project, project);
  });

  return Promise.all(newProjects)
    .then(function() {
      return 'Seeded DB with 3 Projects, 3 Users, 3 Categories';
    });
};

cleanDB()
  .then(createUsers)
  .then(createCategories)
  .then(createProjects)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
