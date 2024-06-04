const db = require('../db');
const getById = require('./get-one');

/**
 * Creates a new settlement item
 *
 * @param   {[string]}  party    Owner of the current item
 * @param   {[string]}  status   Settlement status
 * @param   {[number]}  amount   Settlement amount
 * @param   {[string]}  message  A message to the other party
 *
 * @return  {[id]}               Id of the newly created item
 */
const create = ({ party, status, amount, message }) => {
  return new Promise((resolve, reject) => {
    const createdAt = new Date().toISOString();

    db.run(
      `INSERT INTO settlements (createdAt, party, status, amount, message) VALUES (?, ?, ?, ?, ?)`,
      [createdAt, party, status, amount, message || null],
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
