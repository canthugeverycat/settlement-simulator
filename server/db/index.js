const getAll = require('./settlements/get-all');
const getOne = require('./settlements/get-one');
const create = require('./settlements/create');

module.exports = { settlements: { getAll, getOne, create } };
