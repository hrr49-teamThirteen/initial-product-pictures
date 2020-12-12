const fs = require('fs');
const faker = require('faker');

// these need to be defined here, dont change this.
const NUM_PRODUCTS = 10000000;
const NUM_PHOTOS = 30000000;

const NUM_USERS = 5000;
const NUM_RATINGS = 10000;

function randomImageUrl() {
  const number = faker.random.number({ min: 1, max: 400 });
  return `https://fec-lanister-product-images.s3.amazonaws.com/images/nearmiss_${number}.png`;
}

function productWriter() {
  return new Promise((resolve) => {
    const writer = fs.createWriteStream('server/database/data/products.csv');
    writer.write('id, colorid, price, questions, title\n');
    let count = 0;
    const recursiveWrite = () => {
      let keepWriting = true;
      while (count < NUM_PRODUCTS && keepWriting) {
        count += 1;
        keepWriting = writer.write(
          `${count},`
          + `${faker.random.number({ min: 0, max: 1 })},`
          + `${faker.commerce.price()},`
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
          + `${faker.random.number({ min: 1, max: NUM_PRODUCTS })},`
          + `${randomImageUrl()},`
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

function usersWriter() {
  return new Promise((resolve) => {
    const writer = fs.createWriteStream('server/database/data/users.csv');
    writer.write('id, username\n');
    let count = 0;
    const recursiveWrite = () => {
      let keepWriting = true;
      while (count < NUM_USERS && keepWriting) {
        count += 1;
        keepWriting = writer.write(
          `${count},`
          + `${faker.internet.userName()}\n`,
        );
      }
      if (keepWriting === false && count < NUM_USERS) {
        process.stdout.write(`\r\x1b[Kusers written to CSV: ${Math.ceil((count / NUM_USERS) * 100)}%`);
        writer.once('drain', recursiveWrite);
      } else {
        process.stdout.write('\n');
        writer.end();
      }
    };
    recursiveWrite();
    writer.on('finish', () => {
      resolve('Success writing users CSV');
    });
  });
}

function ratingsWriter() {
  return new Promise((resolve) => {
    const writer = fs.createWriteStream('server/database/data/ratings.csv');
    writer.write('id, user_id, product_id, rating_given\n');
    let count = 0;
    const recursiveWrite = () => {
      let keepWriting = true;
      while (count < NUM_RATINGS && keepWriting) {
        count += 1;
        keepWriting = writer.write(
          `${count},`
          + `${faker.random.number({ min: 1, max: NUM_USERS })},`
          + `${faker.random.number({ min: 1, max: NUM_PRODUCTS })},`
          + `${faker.random.number({ min: 0, max: 5 })}\n`,
        );
      }
      if (keepWriting === false && count < NUM_RATINGS) {
        process.stdout.write(`\r\x1b[Kusers written to CSV: ${Math.ceil((count / NUM_RATINGS) * 100)}%`);
        writer.once('drain', recursiveWrite);
      } else {
        process.stdout.write('\n');
        writer.end();
      }
    };
    recursiveWrite();
    writer.on('finish', () => {
      resolve('Success writing ratings CSV');
    });
  });
}

productWriter()
  .then(() => photoWriter())
  .then(() => usersWriter())
  .then(() => ratingsWriter())
  .catch((err) => {
    console.log('error writing CSV', err.message);
  });
