require('dotenv').config();
require('newrelic');
const redis = require('redis');
const express = require('express');
const bodyparser = require('body-parser');

const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);

client.on('error', (error) => {
  console.error(error);
});

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

const productsController = require('./controllers/productsController');
const photosController = require('./controllers/photosController');
const ratingsController = require('./controllers/ratingsController');

function photoCache(req, res, next) {
  const { id } = req.params;
  client.get(id, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.status(200).json(JSON.parse(data));
    } else {
      next();
    }
  });
}

app.use(express.static('client/dist'));

// read / get
app.get('/api/initial/products/id=:id', productsController.getProductById);
app.get('/api/initial/photos/id=:id', photosController.getPhotoById);
app.get('/api/initial/photos/forproductid/id=:id', photoCache, photosController.getPhotosForProduct);

app.get('/api/initial/products/avgrating/id=:id', ratingsController.getAvgRatingForProduct);

// update / put
app.put('/api/initial/products/updateproduct/id=:id', productsController.updateProduct);
app.put('/api/initial/photos/updatephoto/id=:id', photosController.updatePhoto);

// post / create
app.post('/api/initial/products/createproduct', productsController.createProduct);
app.post('/api/initial/photos/createphoto', photosController.createphoto);

// delete
app.delete('/api/initial/products/delete/id=:id', productsController.deleteProduct);
app.delete('/api/initial/photos/delete/id=:id', photosController.deletePhoto);

// app.get('/api/products1', productsController.getAllProducts); // get all products
// app.get('/api/photos', photosController.getAllPhotos); // get all photos
// app.get('/api/photosBlack', photosController.getAllBlackPhotos);
// app.get('/api/photosRed', photosController.getAllRedPhotos);

module.exports = {
  app,
};
