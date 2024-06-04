const express = require('express');
const {
  settlements: { create: dbCreate },
} = require('../../db/index');

const router = express.Router();

/**
 * Creates a new settlement item
 *
 * @return {string} Id of the newly created item
 */
router.post('/', async (req, res) => {
  const { party, status, amount, message } = req.body;

  try {
    const data = await dbCreate({ party, status, amount, message });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
