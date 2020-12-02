const productsModel = require('../models/productsModel');

async function getAllProducts(req, res) {
  try {
    const productResults = await productsModel.getAllProducts();
    // let photoResults = await models.getAllPhotos();
    res.status(200).json(productResults);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

module.exports = {
  getAllProducts,
};
