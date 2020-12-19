const redis = require('redis');
const photosModel = require('../models/photosModel');

const REDIS_PORT = 6379;
const redisClient = redis.createClient(REDIS_PORT);

redisClient.on('error', (error) => {
  console.error(error);
});

async function getAllPhotos(req, res) {
  try {
    const photoResults = await photosModel.getAllPhotos();
    res.status(200).json(photoResults.fields);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getAllBlackPhotos(req, res) {
  try {
    const blackResults = await photosModel.getAllBlackPhotos();
    res.status(200).json(blackResults);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getAllRedPhotos(req, res) {
  try {
    const redResults = await photosModel.getAllRedPhotos();
    res.status(200).json(redResults);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getPhotoById(req, res) {
  try {
    const results = await photosModel.getPhotoById(req.params.id);
    res.status(200).json(results.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getPhotosForProduct(req, res) {
  try {
    const results = await photosModel.getPhotosForProduct(req.params.id);
    // cache the data in redit for 20 minutes
    redisClient.setex(req.params.id, 1200, JSON.stringify(results.rows));
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function updatePhoto(req, res) {
  try {
    await photosModel.updatePhoto(req.body, req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function createphoto(req, res) {
  const {
    photoURL,
    colorID,
    productID,
  } = req.body;
  try {
    await photosModel.writePhoto(photoURL, colorID, productID);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function deletePhoto(req, res) {
  try {
    await photosModel.deletePhoto(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getAllPhotos,
  getAllBlackPhotos,
  getAllRedPhotos,
  getPhotoById,
  getPhotosForProduct,
  updatePhoto,
  createphoto,
  deletePhoto,
};
