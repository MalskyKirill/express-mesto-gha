const express = require('express');
const mongoose = require('mongoose');

const PORT = 3000;

mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('подключение к бд');
  });

const app = express();

app.listen(PORT, () => {
  console.log('сервер запущен');
});
