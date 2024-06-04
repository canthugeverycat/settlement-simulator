const db = require('../db');

/**
 * Get a single item by its id
 * @param {number} id
 *
 * @return {SettlementItemType}
 */
const getOne = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM settlements WHERE id = ?`, [id], (error, data) => {
      error ? reject(error) : resolve(data);
    });
  });
};

module.exports = getOne;
