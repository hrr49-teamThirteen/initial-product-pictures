/* eslint-disable no-console */
require('dotenv').config();
require('newrelic');
const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

const productsController = require('./controllers/productsController');
const photosController = require('./controllers/photosController');
const ratingsController = require('./controllers/ratingsController');

app.use(express.static('client/dist'));

// read / get
app.get('/api/products/id=:id', productsController.getProductById);
app.get('/api/photos/id=:id', photosController.getPhotoById);
app.get('/api/photos/forproductid/id=:id', photosController.getPhotosForProduct);

app.get('/api/products/avgrating/id=:id', ratingsController.getAvgRatingForProduct);

// update / put
app.put('/api/products/updateproduct/id=:id', productsController.updateProduct);
app.put('/api/photos/updatephoto/id=:id', photosController.updatePhoto);

// post / create
app.post('/api/products/createproduct', productsController.createProduct);
app.post('/api/photos/createphoto', photosController.createphoto);

// delete
app.delete('/api/products/delete/id=:id', productsController.deleteProduct);
app.delete('/api/photos/delete/id=:id', photosController.deletePhoto);

// app.get('/api/products1', productsController.getAllProducts); // get all products
// app.get('/api/photos', photosController.getAllPhotos); // get all photos
// app.get('/api/photosBlack', photosController.getAllBlackPhotos);
// app.get('/api/photosRed', photosController.getAllRedPhotos);

module.exports = {
  app,
};
