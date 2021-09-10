const { factory } = require('factory-girl');
const { Token } = require('../../app/models');

factory.define('Token', Token, {});

exports.saveToken = values => factory.create('Token', values);
