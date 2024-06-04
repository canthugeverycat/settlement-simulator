const express = require('express');
const {
  settlements: { getAll: dbGetAll },
} = require('../../db/index');

const router = express.Router();

/**
 * Fetches all settlement items
 *
 * @return  {SettlementItemType[]} A collection of settlement items
 */
router.get('/', async (req, res) => {
  try {
    const settlements = await dbGetAll();
    res.json(settlements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
