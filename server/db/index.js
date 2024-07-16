const getAll = require('./settlements/get-all');
const getOne = require('./settlements/get-one');
const create = require('./settlements/create');
const deleteAll = require('./settlements/delete-all');

module.exports = { settlements: { getAll, getOne, create, deleteAll } };
