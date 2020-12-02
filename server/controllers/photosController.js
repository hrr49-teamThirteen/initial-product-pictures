const photosModel = require('../models/photosModel');

async function getAllPhotos(req, res) {
  try {
    const photoResults = await photosModel.getAllPhotos();
    res.status(200).json(photoResults);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

async function getAllBlackPhotos(req, res) {
  try {
    const blackResults = await photosModel.getAllBlackPhotos();
    res.status(200).json(blackResults);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

async function getAllRedPhotos(req, res) {
  try {
    const redResults = await photosModel.getAllRedPhotos();
    res.status(200).json(redResults);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

module.exports = {
  getAllPhotos,
  getAllBlackPhotos,
  getAllRedPhotos,
};
