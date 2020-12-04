const fs = require('fs');
const faker = require('faker');

const productHeaders = 'colorID, price, reviewscore, questions, title\n';

function writeProductCSV() {
  return new Promise((resolve, reject) => {
    const myWriter = fs.createWriteStream('products.csv');
    myWriter.write(productHeaders);
    const productWriter = (written) => {
      let count = written || 1;
      let keepWriting = true;
      while (count <= 20 && keepWriting) {
        count += 1;
        keepWriting = myWriter.write(
          `${faker.random.number({ min: 0, max: 1 })},`
          + `${faker.commerce.price()},`
          + `${faker.random.number({ min: 1, max: 5 })},`
          + `${faker.random.number({ min: 1, max: 100 })},`
          + `${faker.commerce.productName()}\n`,
        );
      }
      if (keepWriting === false && count <= 20) {
        myWriter.once('drain', productWriter.bind(null, count));
      }
      myWriter.on('finished', () => {
        resolve('finished writing csv');
      });
      myWriter.on('error', (err) => {
        reject('Error writing csv', err);
      });
    };
  });
}
