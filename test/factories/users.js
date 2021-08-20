const faker = require('faker');
const { factory } = require('factory-girl');
const { User } = require('../../app/models');

factory.define('User', User, {
  name: faker.name.firstName(),
  surname: faker.name.lastName(),
  email() {
    return `${this.name.toLowerCase()}.${this.surname.toLowerCase()}@wolox.co`;
  },
  password: faker.internet.password(10, false, /[0-9A-Z]/)
});

exports.create = userData => factory.create('User', userData);
