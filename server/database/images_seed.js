/* eslint-disable no-await-in-loop */
const fs = require('fs');
const axios = require('axios');

const downloadImage = (url, imagePath) => axios({ url, responseType: 'stream' })
  .then((response) => new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(imagePath))
      .on('finish', () => resolve())
      .on('error', (e) => reject(e));
  }));

async function getImages() {
  const NUM = 500;
  for (let i = 212; i < NUM; i += 1) {
    await downloadImage('http://placeimg.com/640/480', `${__dirname}/data/images/nearmiss_${i}.png`);
    console.log('finished', i);
  }
}

getImages();
