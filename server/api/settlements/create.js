const express = require('express');
const {
  settlements: { create: dbCreate },
} = require('../../db/index');
const handleSettlementCreate = require('../../ws/settlements/create');

const router = express.Router();

/**
 * Creates a new settlement item
 *
 * @return {string} Id of the newly created item
 */
router.post('/', async (req, res) => {
  const { party, status, amount } = req.body;

  try {
    const data = await dbCreate({ party, status, amount });

    handleSettlementCreate({
      wss: req.app.get('wss'),
      id: data.id,
      party,
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
