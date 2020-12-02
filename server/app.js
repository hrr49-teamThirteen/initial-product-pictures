/* eslint-disable no-console */
const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

const productsController = require('./controllers/productsController');
const photosController = require('./controllers/photosController');

app.use(express.static('client/dist'));

app.get('/api/products1', productsController.getAllProducts);
app.get('/api/photos', photosController.getAllPhotos);
app.get('/api/photosBlack', photosController.getAllBlackPhotos);
app.get('/api/photosRed', photosController.getAllRedPhotos);

module.exports = {
  app,
};
