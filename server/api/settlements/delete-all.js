const express = require('express');
const {
  settlements: { deleteAll: dbDeleteAll },
} = require('../../db/index');

const router = express.Router();

/**
 * Deletes all settlement items
 */
router.delete('/', async (req, res) => {
  try {
    await dbDeleteAll();
    res.json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
