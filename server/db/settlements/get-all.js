const db = require('../db');

/**
 * Get all of the settlement items
 *
 * @return  {SettlementItemType[]}  A collection of settlement objects
 */
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM settlements ORDER BY createdAt DESC`,
      (error, data) => {
        error ? reject(error) : resolve(data);
      }
    );
  });
};

module.exports = getAll;
