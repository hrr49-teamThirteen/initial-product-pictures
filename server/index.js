/* eslint-disable no-console */
const { app } = require('./app.js');

const port = 3001;

app.listen(port, (err) => {
  if (err) return console.log('error starting express server msg- ', err.message);
  return console.log(`Listening on port '${port}`);
});
