const db = require('../db');
const getById = require('./get-one');

/**
 * Creates a new settlement item
 *
 * @param   {[string]}  party    Owner of the current item
 * @param   {[string]}  status   Settlement status
 * @param   {[number]}  amount   Settlement amount
 *
 * @return  {[id]}               Id of the newly created item
 */
const create = ({ party, status, amount }) => {
  return new Promise((resolve, reject) => {
    const createdAt = new Date().toISOString();

    db.run(
      `INSERT INTO settlements (createdAt, party, status, amount) VALUES (?, ?, ?, ?)`,
      [createdAt, party, status, amount || null],
      function (error) {
        if (error) {
          reject(error);

          return;
        }

        getById(this.lastID)
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      }
    );
  });
};

module.exports = create;
