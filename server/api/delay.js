const DELAY_MS = 300;

module.exports = (req, res, next) => setTimeout(next, DELAY_MS);
