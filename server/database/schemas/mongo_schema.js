/* eslint-disable no-console */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const url = 'mongodb://127.0.0.1:27017/fec';

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected:', url);
});

db.on('error', (err) => {
  console.error('connection error:', err);
});

const PhotosSchema = new mongoose.Schema({
  id: Number,
  url: String,
  product_id: Number,
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products',
  },
});

const RatingsSchema = new mongoose.Schema({
  id: Number,
  user_id: Number,
  product_id: Number,
  rate_given: {
    type: Number,
    min: 0,
    max: 5,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products',
  },
});

const ProductsSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  colorid: {
    type: Number,
    min: 0,
    max: 1,
  },
  photos: [{
    type: Schema.Types.ObjectId,
    ref: 'Photos',
  }],
  ratings: [{
    type: Schema.Types.ObjectId,
    ref: 'Ratings',
  }],
});

module.exports = {
  Product: mongoose.model('Product', ProductsSchema),
  Ratings: mongoose.model('Ratings', RatingsSchema),
  Photos: mongoose.model('Photos', PhotosSchema),
};
