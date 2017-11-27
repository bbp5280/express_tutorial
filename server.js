const express = require('express');
const app = express();
const path = require('path');
const person = require ('./public/data');

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

app.use(urlLogger, timeLogger);
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (request, response) => {
//   response.send('hello world');
// });


app.get('/json', (request, response) => {
  response.status(200).json(person);
});

app.get('/sunsets', (request, response) => {
  response.status(200).sendFile(path.join(__dirname, 'public/sunsets.html'));
});

app.get('*', (request, response) => {
  response.status(404).sendFile(path.join(__dirname, 'public/404page.html'));
});

app.listen(3000, () => {
  console.log('Express into running on localhost:3000');
});
