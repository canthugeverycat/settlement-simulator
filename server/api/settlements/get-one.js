const express = require('express');
const {
  settlements: { getOne: dbGetOne },
} = require('../../db/index');

const router = express.Router();

/**
 * Fetches a single settlement item by its' id
 *
 * @return  {SettlementItemType} A settlement item
 */
router.get('/:id', async (req, res) => {
  console.log('Excuse me ??');
  const { id } = req.params;
  try {
    const settlement = await dbGetOne(id);

    if (!settlement) {
      res.status(404).json({ error: 'Settlement not found' });
    } else {
      res.json(settlement);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
