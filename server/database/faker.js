//let db = require('index.js');
let faker = require('faker');
let models = require('./models.js');

var getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

for (var i = 0; i < 100; i++) {
  models.writeProduct(getRandomInt(2), faker.commerce.price(), getRandomInt(5), getRandomInt(100), faker.commerce.productName());
}




for (var k = 0; k < 20; k ++) {
  models.writePhoto(faker.image.imageUrl(), getRandomInt(2));
}

