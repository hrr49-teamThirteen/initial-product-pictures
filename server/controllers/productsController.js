/* eslint-disable no-console */
const productsModel = require('../models/productsModel');

async function getAllProducts(req, res) {
  try {
    const productResults = await productsModel.getAllProducts();
    // let photoResults = await models.getAllPhotos();
    res.status(200).json(productResults);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getProductById(req, res) {
  try {
    const singleProduct = await productsModel.getProductById(req.params.id);
    res.status(200).json(singleProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function updateProduct(req, res) {
  try {
    const result = await productsModel.updateProduct(req.body, req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function createProduct(req, res) {
  const {
    colorID,
    price,
    reviewscore,
    questions,
    title,
  } = req.body;
  try {
    await productsModel.writeProduct(colorID, price, reviewscore, questions, title);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function deleteProduct(req, res) {
  try {
    await productsModel.deleteProduct(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
};
