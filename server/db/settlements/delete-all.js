const db = require('../db');

/**
 * Delete all settlement items
 *
 */
const deleteAll = () => {
  return new Promise((resolve, reject) => {
    db.all(`DELETE FROM settlements`, (error) => {
      error ? reject(error) : resolve({});
    });
  });
};

module.exports = deleteAll;
