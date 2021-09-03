const faker = require('faker');
const { factory } = require('factory-girl');
const { Weet } = require('../../app/models');

factory.define('Weet', Weet, {
  content: factory.sequence('Weet.content', () => faker.lorem.words(10)),
  userId: 1
});

exports.create = weetData => factory.create('Weet', weetData);
exports.createMany = size => factory.createMany('Weet', size);
