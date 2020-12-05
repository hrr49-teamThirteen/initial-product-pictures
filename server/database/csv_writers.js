const fs = require('fs');
const faker = require('faker');

// these need to be defined here, dont change this.
const NUM_PRODUCTS = 1000;
const NUM_PHOTOS = 10000;

function productWriter() {
  return new Promise((resolve) => {
    const writer = fs.createWriteStream('server/database/data/products.csv');
    writer.write('id, colorid, price, reviewscore, questions, title\n');
    let count = 0;
    const recursiveWrite = () => {
      let keepWriting = true;
      while (count < NUM_PRODUCTS && keepWriting) {
        count += 1;
        keepWriting = writer.write(
          `${count},`
          + `${faker.random.number({ min: 0, max: 1 })},`
          + `${faker.commerce.price()},`
          + `${faker.random.number({ min: 1, max: 5 })},`
          + `${faker.random.number({ min: 1, max: 100 })},`
          + `${faker.commerce.productName()}\n`,
        );
      }
      if (keepWriting === false && count < NUM_PRODUCTS) {
        process.stdout.write(`\r\x1b[KProducts written to CSV: ${Math.ceil((count / NUM_PRODUCTS) * 100)}%`);
        writer.once('drain', recursiveWrite);
      } else {
        writer.end();
      }
    };
    recursiveWrite();
    writer.on('finish', () => {
      process.stdout.write('\n');
      resolve('Success writing product CSV');
    });
  });
}

function photoWriter() {
  return new Promise((resolve) => {
    const writer = fs.createWriteStream('server/database/data/photos.csv');
    writer.write('id, product_id, photourl, colorid\n');
    let count = 0;
    const recursiveWrite = () => {
      let keepWriting = true;
      while (count < NUM_PHOTOS && keepWriting) {
        count += 1;
        keepWriting = writer.write(
          `${count},`
          + `${((count % NUM_PRODUCTS) + 1)},`
          + `${faker.image.imageUrl()},`
          + `${faker.random.number({ min: 0, max: 1 })}\n`,
        );
      }
      if (keepWriting === false && count < NUM_PHOTOS) {
        process.stdout.write(`\r\x1b[KPhotos written to CSV: ${Math.ceil((count / NUM_PHOTOS) * 100)}%`);
        writer.once('drain', recursiveWrite);
      } else {
        process.stdout.write('\n');
        writer.end();
      }
    };
    recursiveWrite();
    writer.on('finish', () => {
      resolve('Success writing product CSV');
    });
  });
}

module.exports = {
  productWriter,
  photoWriter,
};
