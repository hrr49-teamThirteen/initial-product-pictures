/* eslint-disable no-console */
const faker = require('faker');
const fs = require('fs');
const { exec } = require('child_process');
const { Product, Photos, Ratings } = require('./schemas/mongo_schema');

function randomImageUrl() {
  const number = faker.random.number({ min: 1, max: 400 });
  return `https://fec-lanister-product-images.s3.amazonaws.com/images/nearmiss_${number}.png`;
}

const NUM_PRODUCTS = 10000000;
const NUM_PHOTOS = 20000000;
const NUM_RATINGS = 40000000;

function ratingsJsonWriter() {
  return new Promise((resolve) => {
    const writer = fs.createWriteStream('server/database/data/ratings.json');
    let count = 0;
    const recursiveWrite = () => {
      let keepWriting = true;
      while (count < NUM_RATINGS && keepWriting) {
        count += 1;
        const rating = {
          id: count,
          user_id: faker.random.number({ min: 0, max: 1000 }),
          rate_given: faker.random.number({ min: 1, max: 5 }),
          product_id: `${faker.random.number({ min: 1, max: NUM_PRODUCTS })}`,
        };
        const data = JSON.stringify(rating, null, 2);
        keepWriting = writer.write(data);
      }
      if (keepWriting === false && count < NUM_RATINGS) {
        process.stdout.write(
          `\r\x1b[Kphotos written to photos.json: ${Math.ceil((count / NUM_RATINGS) * 100)}%`,
        );
        writer.once('drain', recursiveWrite);
      } else {
        process.stdout.write('\n');
        writer.end();
      }
    };
    recursiveWrite();
    writer.on('finish', () => {
      resolve('Success writing photos JSON');
    });
  });
}

function photoJsonWriter() {
  return new Promise((resolve) => {
    const writer = fs.createWriteStream('server/database/data/photos.json');
    let count = 0;
    const recursiveWrite = () => {
      let keepWriting = true;
      while (count < NUM_PHOTOS && keepWriting) {
        count += 1;
        const photo = {
          id: count,
          url: randomImageUrl(),
          product_id: faker.random.number({ min: 1, max: NUM_PRODUCTS }),
        };
        const data = JSON.stringify(photo, null, 2);
        keepWriting = writer.write(data);
      }
      if (keepWriting === false && count < NUM_PHOTOS) {
        process.stdout.write(
          `\r\x1b[Kphotos written to photos.json: ${Math.ceil((count / NUM_PHOTOS) * 100)}%`,
        );
        writer.once('drain', recursiveWrite);
      } else {
        process.stdout.write('\n');
        writer.end();
      }
    };
    recursiveWrite();
    writer.on('finish', () => {
      resolve('Success writing photos JSON');
    });
  });
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
          title: faker.commerce.productName(),
          price: faker.commerce.price(),
          colorid: faker.random.number({ min: 0, max: 1 }),
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
      resolve('Success writing product JSON');
    });
  });
}

function importProductJson() {
  return new Promise((resolve, reject) => {
    exec(
      `mongoimport --db fec --collection products --drop --file ${__dirname}/data/products.json`,
      (error, stdout, stderr) => {
        if (error) return reject(error);
        if (stderr) return resolve(stderr);
        return resolve(`stdout: ${stdout}`);
      },
    );
  });
}

function importRatingsJson() {
  return new Promise((resolve, reject) => {
    exec(
      `mongoimport --db fec --collection ratings --drop --file ${__dirname}/data/ratings.json`,
      (error, stdout, stderr) => {
        if (error) return reject(error);
        if (stderr) return resolve(stderr);
        return resolve(`stdout: ${stdout}`);
      },
    );
  });
}

function importPhotoJson() {
  return new Promise((resolve, reject) => {
    exec(
      `mongoimport --db fec --collection photos --drop --file ${__dirname}/data/photos.json`,
      (error, stdout, stderr) => {
        if (error) return reject(error);
        if (stderr) return resolve(stderr);
        return resolve(`stdout: ${stdout}`);
      },
    );
  });
}
// mongoimport --db fec --collection productmodel --drop --file products.json

// Product.count()
//   .then((results) => console.log(results))
//   .catch((err) => console.log(err.message));

productJsonWriter()
  .then(() => ratingsJsonWriter())
  .then(() => photoJsonWriter())
  .then(() => importProductJson())
  .then(() => importRatingsJson())
  .then(() => importPhotoJson())
  .then(() => Product.count())
  .then((entries) => {
    console.log(`Inserted products: ${entries}`);
    return Ratings.count();
  })
  .then((entries) => {
    console.log(`Inserted ratings: ${entries}`);
    return Photos.count();
  })
  .then((entries) => {
    console.log(`Inserted photos: ${entries}`);
  })
  .catch((err) => {
    console.log('failed seeding', err.message);
  });
