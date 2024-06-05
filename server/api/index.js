const express = require('express');
const getAllRouter = require('./settlements/get-all');
const getOneRouter = require('./settlements/get-one');
const createRouter = require('./settlements/create');

const router = express.Router();

/** Set up API endpoints */
router.use('/', getAllRouter);
router.use('/', getOneRouter);
router.use('/', createRouter);

module.exports = router;
