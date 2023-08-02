const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routs/users');

const PORT = 3000;

mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('подключение к бд');
  });

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64ca6f72e3f24b1d8204cdde',
  };

  next();
});

app.use(userRouter);

app.listen(PORT, () => {
  console.log('сервер запущен');
});
