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
  // product: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Products',
  // },
});

const RatingsSchema = new mongoose.Schema({
  id: Number,
  user_id: Number,
  product_id: String,
  // rate_given: {
  //   type: Number,
  //   min: 0,
  //   max: 5,
  // },
  // product: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Products',
  // },
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
  // photos: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Photos',
  // }],
  // ratings: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Ratings',
  // }],
});

const Product = mongoose.model('Product', ProductsSchema);
const Ratings = mongoose.model('Ratings', RatingsSchema);
const Photos = mongoose.model('Photos', PhotosSchema);

async function getProductById(data) {
  // .setOptions({ explain: 'executionStats' });
  const result = await Product.find({ id: data });
  console.log('getProductById results: \n', result);
}

async function getPhotosForProduct(data) {
// .setOptions({ explain: 'executionStats' });
  const result = await Photos.find({ product_id: data });
  console.log('getPhotosForProduct results: \n', result);
}

async function getAvgRatingsForProduct(id) {
// .setOptions({ explain: 'executionStats' });
  // const result = await Ratings.find({ product_id: id });
  const result = await Ratings.aggregate([
    { $match: { product_id: `${id}` } },
    { $group: { _id: '$rate_given', averagerating: { $avg: '$rate_given' } } },
  ], { explain: 'executionStats' });

  console.log('getAvgRatingsForProduct results: \n', result);
}

async function updateProduct(data) {
  // .setOptions({ explain: 'executionStats' });
  const result = await Product.update({ id: data }, { title: 'updated' });
  console.log('updateProduct results: \n', result);
}

async function updateRating(id, data) {
  // .setOptions({ explain: 'executionStats' });
  const result = await Ratings.updateOne({ id }, { rate_given: data });
  console.log('updateRating results: \n', result);
}

async function updatePhoto(id, data) {
  const result = await Photos.updateOne({ id }, { url: data });
  console.log('updatePhoto results: \n', result);
}

// mongoose.set('debug', true);
// getProductById(1);
// getPhotosForProduct(4);
// updateProduct(2);
// updateRating(5, 5);
// updatePhoto(2, 'www.google.com');
// getAvgRatingsForProduct(4);
module.exports = {
  Product,
  Ratings,
  Photos,
};
