const faker = require('faker');
const { factory } = require('factory-girl');
const { User } = require('../../app/models');
const { USER } = require('../../app/constants/roles');

factory.define('User', User, {
  name: factory.seq('User.name', () => faker.name.firstName()),
  surname: factory.seq('User.surname', () => faker.name.lastName()),
  email: factory.seq('User.email', n => `user.email.${n}@wolox.co`),
  password: factory.seq('User.password', () => faker.internet.password(10, false, /[0-9A-Z]/)),
  role: USER
});

exports.create = userData => factory.create('User', userData);
exports.createMany = size => factory.createMany('User', size);
