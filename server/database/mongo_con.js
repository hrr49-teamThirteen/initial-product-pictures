/* eslint-disable no-console */
const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/fec';

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected:', url);
});

db.on('error', (err) => {
  console.error('connection error:', err);
});

const ProductsSchema = new mongoose.Schema({
  id: Number,
  colorid: {
    type: Number,
    min: 0,
    max: 1,
  },
  price: mongoose.Schema.Types.Decimal128,
  reviewscore: {
    type: mongoose.Schema.Types.Decimal128,
    min: 0,
    max: 5,
  },
  title: String,
  photos: [String],
});

module.exports.ProductModel = mongoose.model('ProductsModel', ProductsSchema);
