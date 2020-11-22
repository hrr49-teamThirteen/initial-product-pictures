const express = require('express');
let app = express();
//db = require('./database/models.js');
let bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());

let port = 1238;
let models = require('./database/models.js');

app.use(express.static('client/dist'));

app.get('/api/products1', async function(req, res) {
  try {
    let productResults = await models.getAllProducts();
    //let photoResults = await models.getAllPhotos();
    res.status(200).json(productResults);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

app.get('/api/photos', async function (req, res) {
  try {
    let photoResults = await models.getAllPhotos();
    res.status(200).json(photoResults);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

app.get('/api/photosBlack', async function (req, res) {
  try {
    let blackResults = await models.getAllBlackPhotos();
    res.status(200).json(blackResults);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

app.get('/api/photosRed', async function (req, res) {
  try {
    let redResults = await models.getAllRedPhotos();
    res.status(200).json(redResults);
  } catch (err) {
    res.status(404).send(err.message);
  }
});
//app.get('test')

module.exports = { app };