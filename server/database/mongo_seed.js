/* eslint-disable no-console */
const faker = require('faker');
const fs = require('fs');
const { exec } = require('child_process');
// const ProductsModel = require('./schemas/mongo_schema');

const NUM_PRODUCTS = 10000000;

function makePhotoArray() {
  const numPhotos = faker.random.number({ min: 2, max: 10 });
  const photoArray = [];
  for (let i = 0; i < numPhotos; i += 1) {
    photoArray.push(faker.image.imageUrl());
  }
  return photoArray;
}

function productJsonWriter() {
  return new Promise((resolve) => {
    const writer = fs.createWriteStream('server/database/data/products.json');
    let count = 0;
    const recursiveWrite = () => {
      let keepWriting = true;
      while (count < NUM_PRODUCTS && keepWriting) {
        count += 1;
        const product = {
          id: count,
          colorid: faker.random.number({ min: 0, max: 1 }),
          price: faker.commerce.price(),
          reviewscore: faker.random.number({ min: 1, max: 5 }),
          title: faker.commerce.productName(),
          photos: makePhotoArray(),
        };
        const data = JSON.stringify(product, null, 2);
        keepWriting = writer.write(data);
      }
      if (keepWriting === false && count < NUM_PRODUCTS) {
        process.stdout.write(
          `\r\x1b[KProducts written to products.json: ${Math.ceil((count / NUM_PRODUCTS) * 100)}%`,
        );
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

function importData() {
  return new Promise((resolve, reject) => {
    exec(
      `mongoimport --db fec --collection productmodel --drop --file ${__dirname}/data/products.json`,
      (error, stdout, stderr) => {
        if (error) return reject(error);
        if (stderr) return resolve(stderr);
        return resolve(`stdout: ${stdout}`);
      },
    );
  });
}
// mongoimport --db fec --collection productmodel --drop --file products.json

productJsonWriter()
  .then(() => importData())
  .then((msg) => console.log(msg))
  .catch(() => {
    console.log('failed seeding');
  });
