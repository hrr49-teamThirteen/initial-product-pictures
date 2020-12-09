const ratingsModel = require('../models/ratingsModel');

async function getAvgRatingForProduct(req, res) {
  try {
    const result = await ratingsModel.getAvgRatingForProduct(req.params.id);
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getAvgRatingForProduct,
};
